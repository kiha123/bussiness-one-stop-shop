import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, X, AlertCircle, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import SearchExistingBusiness from '../components/SearchExistingBusiness';
import './Services.css';

const RETIREMENT_REASONS = [
  'Closure due to poor business performance',
  'Owner retirement',
  'Business relocation',
  'Change in business focus',
  'Dissolution of partnership',
  'Owner migration',
  'Other reason',
];

const RETIREMENT_SCOPE = [
  'Entire Business',
  'Specific Line of Business',
  'Specific Permit Only',
];

export default function Renewal() {
  const [form, setForm] = useState({
    selectedBusiness: null,
    retirementScope: 'Entire Business',
    retirementReason: '',
    dateEstablished: '',
    dateClosed: '',
  });
  
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load businesses from localStorage
  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('bpls_applications') || '[]');
    setBusinesses(applications);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.selectedBusiness) newErrors.selectedBusiness = 'Please select a business to retire';
    if (!form.retirementReason) newErrors.retirementReason = 'Please select a retirement reason';
    if (!form.dateEstablished) newErrors.dateEstablished = 'Date established is required';
    if (!form.dateClosed) newErrors.dateClosed = 'Date closed is required';
    
    // Validate dates
    if (form.dateEstablished && form.dateClosed) {
      const established = new Date(form.dateEstablished);
      const closed = new Date(form.dateClosed);
      if (closed <= established) {
        newErrors.dateClosed = 'Date closed must be after date established';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectBusiness = (business) => {
    setForm(prev => ({
      ...prev,
      selectedBusiness: business,
      dateEstablished: business.step1Data?.submittedAt || '',
    }));
    setShowSearchModal(false);
    toast.success('Business selected successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      // Generate tracking code
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      const code = `RETIRE-${timestamp}-${random}`;

      // Create retirement application
      const retirementData = {
        trackingCode: code,
        type: 'retirement',
        businessId: form.selectedBusiness.trackingCode,
        businessName: form.selectedBusiness.business_name,
        ownerName: form.selectedBusiness.owner_name,
        ownerEmail: form.selectedBusiness.step1Data?.emailAddress,
        retirementScope: form.retirementScope,
        retirementReason: form.retirementReason,
        dateEstablished: form.dateEstablished,
        dateClosed: form.dateClosed,
        status: 'pending-review',
        submittedAt: new Date().toISOString(),
      };

      // Store in localStorage
      const retirements = JSON.parse(localStorage.getItem('bpls_retirements') || '[]');
      retirements.push(retirementData);
      localStorage.setItem('bpls_retirements', JSON.stringify(retirements));

      setTrackingCode(code);
      setSuccess(true);
      toast.success('Retirement application submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit retirement application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="service-page">
        <div className="section-container">
          <div className="success-card">
            <CheckCircle size={64} color="var(--clr-accent-light)" />
            <h2>Business Retirement Submitted Successfully!</h2>
            <p>Your business retirement application has been received and is being processed.</p>
            <div className="tracking-box">
              <p className="tracking-label">Your Tracking Code:</p>
              <p className="tracking-code">{trackingCode}</p>
              <p className="tracking-hint">Save this code to track your retirement status.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/services/tracking?code=' + trackingCode)}>
              Track Application <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-page">
      <div className="section-container">
        <div className="service-header">
          <div>
            <h1>🏢 RETIREMENT APPLICATION</h1>
            <p>Apply for business retirement and permit closure.</p>
          </div>
          <button 
            className="btn-close"
            onClick={() => navigate('/services')}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Note Section */}
        <div style={{
          backgroundColor: '#cffafe',
          border: '1px solid #06b6d4',
          borderLeft: '4px solid #06b6d4',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <AlertCircle size={20} style={{ color: '#0891b2', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ margin: 0, color: '#0e7490', fontSize: '14px' }}>
            Note: If the application isn't showing up in search results, please check the Application Details in the Application Module to ensure the Tax Year is set correctly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Column 1: Business Selection */}
            <div className="form-section" style={{ gridColumn: '1' }}>
              <div className="form-group">
                <label htmlFor="businessSearch">Choose Business to Retire *</label>
                {form.selectedBusiness ? (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }}>
                    <p style={{ margin: 0, fontWeight: '500', color: '#166534' }}>
                      {form.selectedBusiness.business_name}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#15803d' }}>
                      BIN: {form.selectedBusiness.dti_number}
                    </p>
                  </div>
                ) : (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '4px',
                    color: '#991b1b',
                    fontSize: '13px',
                  }}>
                    No business selected
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowSearchModal(true)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#0891b2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0570a0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0891b2'}
                >
                  <Search size={16} /> Select Business
                </button>
                {errors.selectedBusiness && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.selectedBusiness}</span>}
              </div>
            </div>

            {/* Column 2: Retirement Details */}
            <div className="form-section" style={{ gridColumn: '2' }}>
              <div className="form-group">
                <label htmlFor="retirementScope">Apply Retirement for *</label>
                <select
                  id="retirementScope"
                  name="retirementScope"
                  value={form.retirementScope}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {RETIREMENT_SCOPE.map(scope => (
                    <option key={scope} value={scope}>{scope}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="retirementReason">Retirement Reason *</label>
                <select
                  id="retirementReason"
                  name="retirementReason"
                  value={form.retirementReason}
                  onChange={handleChange}
                  className={errors.retirementReason ? 'error' : ''}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.retirementReason ? '2px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Select Reason of Retirement</option>
                  {RETIREMENT_REASONS.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
                {errors.retirementReason && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.retirementReason}</span>}
              </div>
            </div>

            {/* Column 3: Dates */}
            <div className="form-section" style={{ gridColumn: '3' }}>
              <div className="form-group">
                <label htmlFor="dateEstablished">Date Established *</label>
                <input
                  type="date"
                  id="dateEstablished"
                  name="dateEstablished"
                  value={form.dateEstablished}
                  onChange={handleChange}
                  className={errors.dateEstablished ? 'error' : ''}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.dateEstablished ? '2px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
                {errors.dateEstablished && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.dateEstablished}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateClosed">Date Closed *</label>
                <input
                  type="date"
                  id="dateClosed"
                  name="dateClosed"
                  value={form.dateClosed}
                  onChange={handleChange}
                  className={errors.dateClosed ? 'error' : ''}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.dateClosed ? '2px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
                {errors.dateClosed && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.dateClosed}</span>}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {form.selectedBusiness && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#374151' }}>Application Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Business Name</p>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#1f2937' }}>{form.selectedBusiness.business_name}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Owner</p>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#1f2937' }}>{form.selectedBusiness.owner_name}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Tax Year</p>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#1f2937' }}>{form.selectedBusiness.taxYear || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : <>Submit Retirement <ArrowRight size={18} /></>}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/services')}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <SearchExistingBusiness
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectBusiness={handleSelectBusiness}
      />
    </div>
  );
}
