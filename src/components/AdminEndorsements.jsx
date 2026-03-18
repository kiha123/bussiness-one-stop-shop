import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Search, Filter, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminEndorsements() {
  const [endorsements, setEndorsements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('all');
  const [selectedEndorsement, setSelectedEndorsement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const offices = [
    { id: 'sanitary', name: 'Sanitary Office' },
    { id: 'fire', name: 'Fire Safety Inspection' },
    { id: 'building', name: 'Building Official' }
  ];

  useEffect(() => {
    fetchEndorsements();
  }, [selectedOffice]);

  const fetchEndorsements = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('business_applications')
        .select('*')
        .eq('status', 'pending-review')
        .order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      setEndorsements(data || []);
    } catch (error) {
      console.error('Error fetching endorsements:', error);
      toast.error('Failed to load endorsements');
    } finally {
      setLoading(false);
    }
  };

  const filteredEndorsements = endorsements.filter(endorsement =>
    endorsement.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (endorsement) => {
    try {
      const { error } = await supabase
        .from('business_applications')
        .update({ endorsement_status: 'approved', updated_at: new Date() })
        .eq('id', endorsement.id);

      if (error) throw error;
      toast.success('Endorsement approved');
      fetchEndorsements();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to approve endorsement');
    }
  };

  const handleReject = async (endorsement) => {
    try {
      const { error } = await supabase
        .from('business_applications')
        .update({ endorsement_status: 'rejected', updated_at: new Date() })
        .eq('id', endorsement.id);

      if (error) throw error;
      toast.success('Endorsement rejected');
      fetchEndorsements();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to reject endorsement');
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading endorsements...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Endorsements Management</h2>
        <p>Manage compliance endorsements from different offices</p>
      </div>

      {/* Office Tabs */}
      <div className="office-tabs">
        <button
          className={`office-tab ${selectedOffice === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedOffice('all')}
        >
          All Offices
        </button>
        {offices.map(office => (
          <button
            key={office.id}
            className={`office-tab ${selectedOffice === office.id ? 'active' : ''}`}
            onClick={() => setSelectedOffice(office.id)}
          >
            {office.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="section-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Endorsements List */}
      <div className="endorsements-container">
        {filteredEndorsements.length > 0 ? (
          filteredEndorsements.map(endorsement => (
            <div key={endorsement.id} className="endorsement-card">
              <div className="card-header">
                <h3>{endorsement.business_name}</h3>
                <span className="badge badge-info">Pending Review</span>
              </div>
              <div className="card-body">
                <div className="endorsement-info">
                  <p><strong>Owner:</strong> {endorsement.owner_name}</p>
                  <p><strong>Business Type:</strong> {endorsement.business_type}</p>
                  <p><strong>Submitted:</strong> {new Date(endorsement.created_at).toLocaleDateString()}</p>
                  <p><strong>Address:</strong> {endorsement.address || 'N/A'}</p>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedEndorsement(endorsement);
                    setShowModal(true);
                  }}
                >
                  <MessageSquare size={16} />
                  Add Remarks
                </button>
                <div className="action-buttons">
                  <button
                    className="btn-success"
                    onClick={() => handleApprove(endorsement)}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleReject(endorsement)}
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No endorsements pending for this office</p>
          </div>
        )}
      </div>

      {/* Remarks Modal */}
      {showModal && selectedEndorsement && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Inspection Remarks</h3>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  value={selectedEndorsement.business_name}
                  disabled
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Inspection Remarks *</label>
                <textarea
                  placeholder="Enter inspection findings and remarks..."
                  className="form-control"
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" />
                  <span>All requirements met</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-success"
                onClick={() => {
                  handleApprove(selectedEndorsement);
                  setShowModal(false);
                }}
              >
                <CheckCircle size={16} />
                Approve Endorsement
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  handleReject(selectedEndorsement);
                  setShowModal(false);
                }}
              >
                <XCircle size={16} />
                Reject Endorsement
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
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
