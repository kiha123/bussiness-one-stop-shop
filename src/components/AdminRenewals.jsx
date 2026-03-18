import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminRenewals() {
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedRenewal, setSelectedRenewal] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRenewals();
  }, [filter]);

  const fetchRenewals = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('business_renewals')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setRenewals(data || []);
    } catch (error) {
      console.error('Error fetching renewals:', error);
      toast.error('Failed to load renewals');
    } finally {
      setLoading(false);
    }
  };

  const updateRenewalStatus = async (id, newStatus) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('business_renewals')
        .update({ status: newStatus, updated_at: new Date() })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Renewal ${newStatus}`);
      setSelectedRenewal(null);
      fetchRenewals();
    } catch (error) {
      console.error('Error updating renewal:', error);
      toast.error('Failed to update renewal');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved':
        return 'badge-success';
      case 'rejected':
        return 'badge-danger';
      case 'pending-review':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Business Renewals</h2>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Renewals</option>
            <option value="pending-review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {selectedRenewal ? (
        <div className="detail-panel">
          <button
            className="close-button"
            onClick={() => setSelectedRenewal(null)}
          >
            ✕
          </button>
          <h3>{selectedRenewal.business_name}</h3>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">Tracking Code:</span>
              <span className="value">{selectedRenewal.tracking_code}</span>
            </div>
            <div className="detail-row">
              <span className="label">Permit Number:</span>
              <span className="value">{selectedRenewal.permit_number}</span>
            </div>
            <div className="detail-row">
              <span className="label">Owner:</span>
              <span className="value">{selectedRenewal.owner_name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Contact:</span>
              <span className="value">{selectedRenewal.contact_number}</span>
            </div>
            <div className="detail-row">
              <span className="label">Capitalization:</span>
              <span className="value">₱{selectedRenewal.capitalization?.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`badge ${getStatusBadgeColor(selectedRenewal.status)}`}>
                {selectedRenewal.status}
              </span>
            </div>
          </div>

          {selectedRenewal.status === 'pending-review' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => updateRenewalStatus(selectedRenewal.id, 'approved')}
                disabled={actionLoading}
              >
                <Check size={18} /> Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => updateRenewalStatus(selectedRenewal.id, 'rejected')}
                disabled={actionLoading}
              >
                <X size={18} /> Reject
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          {loading ? (
            <div className="loading">Loading renewals...</div>
          ) : renewals.length === 0 ? (
            <div className="empty-state">No renewals found</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tracking Code</th>
                  <th>Permit Number</th>
                  <th>Business Name</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((renewal) => (
                  <tr key={renewal.id}>
                    <td className="font-mono">{renewal.tracking_code}</td>
                    <td className="font-mono">{renewal.permit_number}</td>
                    <td>{renewal.business_name}</td>
                    <td>{renewal.owner_name}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(renewal.status)}`}>
                        {renewal.status}
                      </span>
                    </td>
                    <td>{new Date(renewal.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => setSelectedRenewal(renewal)}
                        title="View details"
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
    </div>
  );
}
