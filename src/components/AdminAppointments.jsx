import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];

      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (filter === 'upcoming') {
        query = query.gte('appointment_date', today).eq('status', 'confirmed');
      } else if (filter === 'completed') {
        query = query.lt('appointment_date', today);
      } else if (filter === 'cancelled') {
        query = query.eq('status', 'cancelled');
      }

      const { data, error } = await query;
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Appointment ${newStatus}`);
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-danger';
      case 'pending':
        return 'badge-warning';
      case 'completed':
        return 'badge-info';
      default:
        return 'badge-default';
    }
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Appointments Management</h2>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {selectedAppointment ? (
        <div className="detail-panel">
          <button
            className="close-button"
            onClick={() => setSelectedAppointment(null)}
          >
            ✕
          </button>
          <h3>Appointment Details</h3>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{selectedAppointment.user_email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Date:</span>
              <span className="value">
                {new Date(selectedAppointment.appointment_date).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Time:</span>
              <span className="value">{selectedAppointment.appointment_time}</span>
            </div>
            <div className="detail-row">
              <span className="label">Purpose:</span>
              <span className="value">{selectedAppointment.purpose}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`badge ${getStatusBadgeColor(selectedAppointment.status)}`}>
                {selectedAppointment.status}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Booked On:</span>
              <span className="value">
                {new Date(selectedAppointment.created_at).toLocaleString()}
              </span>
            </div>
          </div>

          {selectedAppointment.status === 'confirmed' && isUpcoming(selectedAppointment.appointment_date) && (
            <div className="action-buttons">
              <button
                className="btn btn-warning"
                onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                disabled={actionLoading}
              >
                <Check size={18} /> Mark Completed
              </button>
              <button
                className="btn btn-danger"
                onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}
                disabled={actionLoading}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          {loading ? (
            <div className="loading">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">No appointments found</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Booked</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.user_email}</td>
                    <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                    <td>{appt.appointment_time}</td>
                    <td>{appt.purpose}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td>{new Date(appt.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => setSelectedAppointment(appt)}
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
