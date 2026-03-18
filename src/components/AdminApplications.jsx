import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X, Eye, Send, AlertCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending-review');
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionMessage, setCorrectionMessage] = useState('');
  const [showEndorsementModal, setShowEndorsementModal] = useState(false);
  const [selectedOffices, setSelectedOffices] = useState([]);

  const endorsingOffices = [
    { id: 'sanitary', name: 'Sanitary Office', label: 'Sanitary Inspection' },
    { id: 'fire', name: 'Bureau of Fire Protection', label: 'Fire Safety Clearance' },
    { id: 'building', name: 'Office of the Building Official (OBO)', label: 'Building Compliance' }
  ];

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('business_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, newStatus, additionalData = {}) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('business_applications')
        .update({ status: newStatus, updated_at: new Date(), ...additionalData })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Application ${newStatus.replace('-', ' ')}`);
      setSelectedApp(null);
      setShowCorrectionModal(false);
      setCorrectionMessage('');
      setShowEndorsementModal(false);
      setSelectedOffices([]);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendCorrection = () => {
    if (!correctionMessage.trim()) {
      toast.error('Please enter correction details');
      return;
    }
    updateApplicationStatus(selectedApp.id, 'correction-requested', {
      correction_message: correctionMessage
    });
  };

  const handleForwardToEndorsement = () => {
    if (selectedOffices.length === 0) {
      toast.error('Please select at least one endorsing office');
      return;
    }
    updateApplicationStatus(selectedApp.id, 'for-endorsement', {
      endorsing_offices: selectedOffices.join(', ')
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved':
        return 'badge-success';
      case 'rejected':
        return 'badge-danger';
      case 'pending-review':
        return 'badge-warning';
      case 'for-compliance':
        return 'badge-info';
      case 'for-endorsement':
        return 'badge-info';
      case 'for-payment':
        return 'badge-secondary';
      case 'correction-requested':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending-review': 'Pending Review',
      'for-compliance': 'For Compliance',
      'for-endorsement': 'For Endorsement',
      'for-payment': 'For Payment',
      'correction-requested': 'Correction Requested',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };
    return labels[status] || status;
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Application Review</h2>
        <p>Review and manage business applications</p>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Applications</option>
            <option value="pending-review">Pending Review</option>
            <option value="for-compliance">For Compliance</option>
            <option value="for-endorsement">For Endorsement</option>
            <option value="for-payment">For Payment</option>
            <option value="correction-requested">Correction Requested</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {selectedApp ? (
        <div className="detail-panel">
          <button
            className="close-button"
            onClick={() => setSelectedApp(null)}
          >
            ✕
          </button>
          <h3>{selectedApp.business_name}</h3>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">Application ID:</span>
              <span className="value">{selectedApp.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Owner:</span>
              <span className="value">{selectedApp.owner_name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Address:</span>
              <span className="value">{selectedApp.address}</span>
            </div>
            <div className="detail-row">
              <span className="label">Contact:</span>
              <span className="value">{selectedApp.contact_number}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{selectedApp.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Business Type:</span>
              <span className="value">{selectedApp.business_type}</span>
            </div>
            <div className="detail-row">
              <span className="label">Capitalization:</span>
              <span className="value">₱{selectedApp.capitalization?.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`badge ${getStatusBadgeColor(selectedApp.status)}`}>
                {getStatusLabel(selectedApp.status)}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Date Submitted:</span>
              <span className="value">{new Date(selectedApp.created_at).toLocaleDateString()}</span>
            </div>
            {selectedApp.documents && (
              <div className="detail-row">
                <span className="label">Documents:</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {Array.isArray(selectedApp.documents) && selectedApp.documents.map((doc, idx) => (
                    <a key={idx} href={doc} target="_blank" rel="noopener noreferrer" className="link-button">
                      Document {idx + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedApp.status === 'pending-review' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateApplicationStatus(selectedApp.id, 'for-compliance')}
                disabled={actionLoading}
              >
                <Check size={18} /> Send for Compliance
              </button>
              <button
                className="btn btn-info"
                onClick={() => setShowEndorsementModal(true)}
                disabled={actionLoading}
              >
                <Send size={18} /> Forward to Endorsement
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setShowCorrectionModal(true)}
                disabled={actionLoading}
              >
                <AlertCircle size={18} /> Request Correction
              </button>
              <button
                className="btn btn-danger"
                onClick={() => updateApplicationStatus(selectedApp.id, 'rejected')}
                disabled={actionLoading}
              >
                <X size={18} /> Reject
              </button>
            </div>
          )}

          {selectedApp.status === 'for-compliance' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateApplicationStatus(selectedApp.id, 'for-payment')}
                disabled={actionLoading}
              >
                <Check size={18} /> Move to Payment
              </button>
              <button
                className="btn btn-warning"
                onClick={() => updateApplicationStatus(selectedApp.id, 'pending-review')}
                disabled={actionLoading}
              >
                Back to Review
              </button>
            </div>
          )}

          {selectedApp.status === 'for-endorsement' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateApplicationStatus(selectedApp.id, 'for-payment')}
                disabled={actionLoading}
              >
                <Check size={18} /> Endorsements Complete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => updateApplicationStatus(selectedApp.id, 'pending-review')}
                disabled={actionLoading}
              >
                Back to Review
              </button>
            </div>
          )}

          {selectedApp.status === 'for-payment' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateApplicationStatus(selectedApp.id, 'approved')}
                disabled={actionLoading}
              >
                <Check size={18} /> Approve & Issue Permit
              </button>
              <button
                className="btn btn-warning"
                onClick={() => updateApplicationStatus(selectedApp.id, 'pending-review')}
                disabled={actionLoading}
              >
                Back to Review
              </button>
            </div>
          )}

          {selectedApp.status === 'correction-requested' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateApplicationStatus(selectedApp.id, 'pending-review')}
                disabled={actionLoading}
              >
                <Check size={18} /> Corrections Received
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="empty-state">No applications found</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Business Name</th>
                  <th>Owner</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="font-mono">{app.id.substring(0, 8)}</td>
                    <td>{app.business_name}</td>
                    <td>{app.owner_name}</td>
                    <td>{new Date(app.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => setSelectedApp(app)}
                        title="View details and take action"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Correction Modal */}
      {showCorrectionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request Correction</h3>
            <p>Specify what corrections are needed:</p>
            <textarea
              value={correctionMessage}
              onChange={(e) => setCorrectionMessage(e.target.value)}
              placeholder="Enter correction requirements..."
              rows="6"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button
                className="btn btn-warning"
                onClick={handleSendCorrection}
                disabled={actionLoading}
              >
                Send Correction Request
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCorrectionModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Endorsement Modal */}
      {showEndorsementModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Forward to Endorsing Offices</h3>
            <p>Select offices for endorsement:</p>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '1rem' }}>
              {endorsingOffices.map(office => (
                <label key={office.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedOffices.includes(office.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOffices([...selectedOffices, office.id]);
                      } else {
                        setSelectedOffices(selectedOffices.filter(id => id !== office.id));
                      }
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{office.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{office.label}</div>
                  </div>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button
                className="btn btn-success"
                onClick={handleForwardToEndorsement}
                disabled={actionLoading}
              >
                Forward to Selected Offices
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowEndorsementModal(false);
                  setSelectedOffices([]);
                }}
                disabled={actionLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
