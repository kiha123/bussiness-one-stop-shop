import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDate, getStatusBadge, getProgressSteps } from '../../utils';
import { toast } from 'react-toastify';
import './Services.css';

const PROGRESS_STEPS = [
  { step: 1, label: 'Submitted' },
  { step: 2, label: 'Under Review' },
  { step: 3, label: 'For Payment' },
  { step: 4, label: 'Approved' },
  { step: 5, label: 'Released' },
];

export default function Tracking() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get('code') || localStorage.getItem('trackingSearchCode') || '');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [applicationType, setApplicationType] = useState('');

  useEffect(() => {
    // Check if we need to auto-search
    const initialCode = searchParams.get('code') || localStorage.getItem('trackingSearchCode');
    
    if (initialCode) {
      // Auto-search with the code
      handleSearch(initialCode);
      // Update the input field
      setTrackingCode(initialCode);
      // Clear the localStorage search code after using it once
      localStorage.removeItem('trackingSearchCode');
    }
  }, [searchParams]); // Only run when searchParams changes

  const handleSearch = async (code) => {
    if (!code.trim()) {
      toast.error('Please enter a tracking code');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      // First, search in localStorage (recently submitted applications)
      const applications = JSON.parse(localStorage.getItem('bpls_applications') || '[]');
      const localApp = applications.find(app => app.trackingCode === code);

      if (localApp) {
        // Found in localStorage - construct the application object with all needed fields
        const appData = {
          ...localApp,
          tracking_code: localApp.trackingCode,
          status_display: localApp.status || 'Submitted',
          created_at: localApp.submittedAt,
          // Ensure these fields exist from step1Data fallback
          business_name: localApp.business_name || localApp.step1Data?.businessName || 'N/A',
          owner_name: localApp.owner_name || (localApp.step1Data ? `${localApp.step1Data.firstName || ''} ${localApp.step1Data.lastName || ''}`.trim() : 'N/A'),
          business_type: localApp.business_type || localApp.step1Data?.typeOfOrganization || 'N/A',
          email: localApp.email || localApp.step1Data?.emailAddress || 'N/A',
          contact_number: localApp.contact_number || localApp.step1Data?.mobileNumber || 'N/A',
          status: localApp.status || 'Submitted',
        };
        
        console.log('Found app in localStorage:', appData);
        setApplication(appData);
        setApplicationType('local');
        setLoading(false);
        return;
      }

      // If not found in localStorage, search in Supabase
      const { data: appData, error: appError } = await supabase
        .from('business_applications')
        .select('*')
        .eq('tracking_code', code)
        .single();

      if (appData) {
        setApplication(appData);
        setApplicationType('registration');
        setLoading(false);
        return;
      }
      
      // Search in business_renewals
      const { data: renData, error: renError } = await supabase
        .from('business_renewals')
        .select('*')
        .eq('tracking_code', code)
        .single();

      if (renData) {
        setApplication(renData);
        setApplicationType('renewal');
        setLoading(false);
        return;
      }

      // Not found anywhere
      setApplication(null);
      toast.error('Application not found. Please check your tracking code.');
    } catch (err) {
      console.error('Search error:', err);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(trackingCode);
    setSearchParams({ code: trackingCode });
  };

  const progress = application ? getProgressSteps(application.status) : 0;
  const statusBadge = application ? getStatusBadge(application.status) : null;

  return (
    <div className="service-page">
      <div className="section-container">
        <div className="service-header">
          <div>
            <h1>Track Your Application</h1>
            <p>Enter your tracking code to check the status of your application.</p>
          </div>
          <button 
            className="btn-close"
            onClick={() => navigate('/services')}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="tracking-search">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="e.g., BIZ-2026-12345 or REN-2026-12345"
              className="search-input"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && !application && !loading && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <div>
              <h3>Application Not Found</h3>
              <p>We couldn't find an application with that tracking code. Please double-check and try again.</p>
            </div>
          </div>
        )}

        {application && (
          <div className="tracking-results">
            {/* Status Banner */}
            <div className="status-banner">
              <div className="status-info">
                <h2>{applicationType === 'renewal' ? 'Business Renewal' : 'New Business Registration'}</h2>
                <p className="tracking-code-display">{application.tracking_code}</p>
              </div>
              <div className={`status-badge ${statusBadge?.color || 'bg-blue-500'}`}>
                {statusBadge?.label || 'Pending Review'}
              </div>
            </div>

            {/* Application Details */}
            <div className="details-grid">
              <div className="detail-card">
                <h3>Business Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Business Name:</span>
                  <span className="detail-value">{application?.business_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Owner Name:</span>
                  <span className="detail-value">{application?.owner_name || 'N/A'}</span>
                </div>
                {application?.business_type && (
                  <div className="detail-item">
                    <span className="detail-label">Business Type:</span>
                    <span className="detail-value">{application.business_type}</span>
                  </div>
                )}
              </div>

              <div className="detail-card">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{application?.email || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{application?.contact_number || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Submitted:</span>
                  <span className="detail-value">{application?.created_at ? formatDate(application.created_at) : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="progress-section">
              <h3>Application Progress</h3>
              <div className="progress-timeline">
                {PROGRESS_STEPS.map((item, index) => (
                  <div key={item.step} className="progress-item">
                    <div className={`progress-dot ${progress >= item.step ? 'completed' : ''}`}>
                      {progress >= item.step ? (
                        <CheckCircle size={24} />
                      ) : (
                        <div className="pending-dot" />
                      )}
                    </div>
                    <div className="progress-label">
                      <p className="step-label">{item.label}</p>
                    </div>
                    {index < PROGRESS_STEPS.length - 1 && (
                      <div className={`progress-line ${progress > item.step ? 'completed' : ''}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="next-steps-card">
              <h3>Next Steps</h3>
              {(application.status === 'Submitted' || application.status === 'submitted') && (
                <p>Your application has been successfully submitted! Our team will review it within 1-2 business days. You will receive an email update on the status.</p>
              )}
              {application.status === 'pending-review' && (
                <p>Your application is being reviewed by BPLO staff. This usually takes 1-2 business days.</p>
              )}
              {application.status === 'for-payment' && (
                <p>Your application has been approved and is now waiting for payment. Please proceed to payment to complete the process.</p>
              )}
              {application.status === 'approved' && (
                <p>Congratulations! Your application has been approved. Your permit will be ready for pickup shortly.</p>
              )}
              {application.status === 'released' && (
                <p>Your business permit has been released. You can now pick it up from our office.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
