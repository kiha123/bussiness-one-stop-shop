import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Filter, CheckCircle, Clock, XCircle, Download, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('business_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('payment_status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="badge badge-success">Paid</span>;
      case 'pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'overdue':
        return <span className="badge badge-danger">Overdue</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleGenerateReceipt = (payment) => {
    toast.success(`Receipt generated for ${payment.business_name}`);
  };

  if (loading) {
    return <div className="loading-spinner">Loading payments...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Payment Management</h2>
        <p>Monitor and manage payment transactions</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Paid</p>
            <p className="stat-value">₱2,450,000</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">₱345,000</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Overdue</p>
            <p className="stat-value">₱125,000</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="section-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by business name or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Business Name</th>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="transaction-id">{payment.id?.substring(0, 10)}...</td>
                  <td className="business-name">{payment.business_name}</td>
                  <td>Business Permit Fee</td>
                  <td className="amount">₱5,000</td>
                  <td>{payment.created_at ? new Date(payment.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td>{getPaymentStatusBadge(payment.payment_status || 'pending')}</td>
                  <td>Bank Transfer</td>
                  <td className="actions">
                    <button 
                      className="btn-icon"
                      title="View Details"
                      onClick={() => handleViewDetails(payment)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-icon"
                      title="Generate Receipt"
                      onClick={() => handleGenerateReceipt(payment)}
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-message">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showModal && selectedPayment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Payment Details</h3>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="payment-details">
                <div className="detail-row">
                  <span className="detail-label">Business Name:</span>
                  <span className="detail-value">{selectedPayment.business_name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">₱5,000.00</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Date:</span>
                  <span className="detail-value">
                    {new Date(selectedPayment.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">Bank Transfer</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">
                    {getPaymentStatusBadge(selectedPayment.payment_status || 'pending')}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => handleGenerateReceipt(selectedPayment)}>
                <Download size={16} />
                Generate Receipt
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
