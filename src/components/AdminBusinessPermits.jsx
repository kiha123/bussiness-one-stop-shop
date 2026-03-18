import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Download, Eye, QrCode, History, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminBusinessPermits() {
  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPermits();
  }, []);

  const fetchPermits = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPermits(data || []);
    } catch (error) {
      console.error('Error fetching permits:', error);
      toast.error('Failed to load permits');
    } finally {
      setLoading(false);
    }
  };

  const filteredPermits = permits.filter(permit =>
    permit.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permit.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGeneratePDF = (permit) => {
    toast.success(`PDF for ${permit.business_name} generated successfully`);
  };

  const handleDownloadPermit = (permit) => {
    toast.success(`Downloading permit for ${permit.business_name}`);
  };

  const handleViewHistory = (permit) => {
    setSelectedPermit(permit);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading-spinner">Loading permits...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Business Permits Management</h2>
        <p>Manage and generate business permits</p>
      </div>

      {/* Filters */}
      <div className="section-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by permit or business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter size={18} />
          All Permits
        </button>
      </div>

      {/* Permits Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Permit ID</th>
              <th>Business Name</th>
              <th>Owner</th>
              <th>Business Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPermits.length > 0 ? (
              filteredPermits.map((permit) => (
                <tr key={permit.id}>
                  <td className="permit-id">{permit.id?.substring(0, 8)}...</td>
                  <td className="business-name">{permit.business_name}</td>
                  <td>{permit.owner_name}</td>
                  <td>{permit.business_type}</td>
                  <td>{new Date(permit.created_at).toLocaleDateString()}</td>
                  <td>{permit.expiry_date || 'N/A'}</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td className="actions">
                    <button className="btn-icon" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-icon" 
                      title="Generate PDF"
                      onClick={() => handleGeneratePDF(permit)}
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      className="btn-icon" 
                      title="QR Code"
                    >
                      <QrCode size={16} />
                    </button>
                    <button 
                      className="btn-icon" 
                      title="View History"
                      onClick={() => handleViewHistory(permit)}
                    >
                      <History size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-message">
                  No permits found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* History Modal */}
      {showModal && selectedPermit && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Permit History: {selectedPermit.business_name}</h3>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="history-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker completed"></div>
                  <div className="timeline-content">
                    <h4>Application Submitted</h4>
                    <p>{new Date(selectedPermit.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker completed"></div>
                  <div className="timeline-content">
                    <h4>Permit Approved</h4>
                    <p>{new Date(selectedPermit.updated_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Permit Renewal</h4>
                    <p>Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
