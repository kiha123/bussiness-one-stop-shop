import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatDate } from '../utils';
import { toast } from 'react-toastify';
import './Services.css';

export default function Verification() {
  const navigate = useNavigate();
  const [permitNumber, setPermitNumber] = useState('');
  const [permit, setPermit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!permitNumber.trim()) {
      toast.error('Please enter a permit number');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      // In a real scenario, you would search in a 'permits' table
      // For demo, we'll simulate a response
      const { data, error } = await supabase
        .from('business_applications')
        .select('*')
        .eq('status', 'released')
        .limit(1)
        .single();

      // In production, search would be: eq('permit_number', permitNumber)

      if (data) {
        // Mock permit data with expiration
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        
        setPermit({
          permitNumber: permitNumber,
          businessName: data.business_name,
          ownerName: data.owner_name,
          expirationDate: expirationDate.toISOString(),
          issuedDate: data.created_at,
          status: 'valid',
        });
      } else {
        setPermit({
          permitNumber: permitNumber,
          status: 'not_found',
        });
        toast.error('Permit not found in the system.');
      }
    } catch (err) {
      setPermit({
        permitNumber: permitNumber,
        status: 'not_found',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = () => {
    if (!permit) return null;

    if (permit.status === 'not_found') {
      return {
        icon: XCircle,
        color: 'text-red',
        label: 'Not Found',
        description: 'This permit number does not exist in our database.',
      };
    } else if (permit.status === 'expired') {
      return {
        icon: AlertCircle,
        color: 'text-orange',
        label: 'Expired',
        description: 'This permit has expired and needs to be renewed.',
      };
    } else {
      return {
        icon: CheckCircle,
        color: 'text-green',
        label: 'Valid',
        description: 'This is a valid and active business permit.',
      };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="service-page">
      <div className="section-container">
        <div className="service-header">
          <div>
            <h1>Verify Business Permit</h1>
            <p>Check the authenticity and validity of a business permit.</p>
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
        <form onSubmit={handleSearch} className="tracking-search">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              value={permitNumber}
              onChange={(e) => setPermitNumber(e.target.value.toUpperCase())}
              placeholder="Enter permit number"
              className="search-input"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && permit && statusDisplay && (
          <div className={`verification-result status-${permit.status}`}>
            <div className="result-header">
              {statusDisplay.icon && <statusDisplay.icon size={48} className={statusDisplay.color} />}
              <div className="result-title">
                <h2>{statusDisplay.label}</h2>
                <p>{statusDisplay.description}</p>
              </div>
            </div>

            {permit.status !== 'not_found' && (
              <div className="result-details">
                <div className="detail-grid-2col">
                  <div className="detail-card">
                    <h3>Permit Details</h3>
                    <div className="detail-item">
                      <span className="detail-label">Permit Number:</span>
                      <span className="detail-value">{permit.permitNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Issued Date:</span>
                      <span className="detail-value">{formatDate(permit.issuedDate)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Expiration Date:</span>
                      <span className="detail-value">{formatDate(permit.expirationDate)}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <h3>Business Information</h3>
                    <div className="detail-item">
                      <span className="detail-label">Business Name:</span>
                      <span className="detail-value">{permit.businessName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Owner Name:</span>
                      <span className="detail-value">{permit.ownerName}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="empty-state">
            <Search size={48} />
            <h3>Verify a permit</h3>
            <p>Enter a permit number above to check if it is valid and currently active.</p>
          </div>
        )}
      </div>
    </div>
  );
}
