import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils';
import { toast } from 'react-toastify';
import './Services.css';

const APPOINTMENT_PURPOSES = [
  'New Business Registration',
  'Permit Renewal',
  'Document Submission',
  'Payment',
  'Permit Pickup',
  'Consultation',
  'Other',
];

const TIME_SLOTS = [
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
];

export default function Appointment() {
  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    purpose: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.timeSlot) newErrors.timeSlot = 'Time slot is required';
    if (!form.purpose) newErrors.purpose = 'Purpose is required';

    // Check if selected time is in the future
    const selectedDateTime = new Date(`${form.date}T${form.timeSlot}`);
    if (selectedDateTime < new Date()) {
      newErrors.timeSlot = 'Cannot book past appointments';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Check for double booking
      const { data: existing } = await supabase
        .from('appointments')
        .select('*')
        .eq('appointment_date', form.date)
        .eq('appointment_time', form.timeSlot)
        .limit(1);

      if (existing && existing.length > 0) {
        toast.error('This time slot is already booked. Please choose another.');
        setLoading(false);
        return;
      }

      const appointment = {
        user_id: user?.id,
        user_email: user?.email,
        appointment_date: form.date,
        appointment_time: form.timeSlot,
        purpose: form.purpose,
        status: 'confirmed',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('appointments')
        .insert([appointment]);

      if (error) throw error;

      setAppointmentData(appointment);
      setSuccess(true);
      toast.success('Appointment booked successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (success && appointmentData) {
    return (
      <div className="service-page">
        <div className="section-container">
          <div className="success-card">
            <CheckCircle size={64} color="var(--clr-accent-light)" />
            <h2>Appointment Confirmed!</h2>
            <p>Your appointment has been successfully scheduled.</p>
            
            <div className="appointment-summary">
              <div className="summary-item">
                <Calendar size={20} />
                <div>
                  <p className="summary-label">Date</p>
                  <p className="summary-value">{formatDate(appointmentData.appointment_date)}</p>
                </div>
              </div>
              <div className="summary-item">
                <Clock size={20} />
                <div>
                  <p className="summary-label">Time</p>
                  <p className="summary-value">{appointmentData.appointment_time}</p>
                </div>
              </div>
              <div className="summary-item">
                <AlertCircle size={20} />
                <div>
                  <p className="summary-label">Purpose</p>
                  <p className="summary-value">{appointmentData.purpose}</p>
                </div>
              </div>
            </div>

            <div className="confirmation-note">
              <p>A confirmation email has been sent to <strong>{appointmentData.user_email}</strong></p>
              <p>Please arrive 10 minutes early to your appointment. Bring all required documents.</p>
            </div>

            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
              Back to Home
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
            <h1>Schedule an Appointment</h1>
            <p>Book an appointment at the BOSS Office for your business needs.</p>
          </div>
          <button 
            className="btn-close"
            onClick={() => navigate('/services')}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-section">
            <h3>Appointment Details</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
                <small>Select a date within the next 30 days</small>
              </div>

              <div className="form-group">
                <label htmlFor="timeSlot">Preferred Time *</label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  className={errors.timeSlot ? 'error' : ''}
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.timeSlot && <span className="error-text">{errors.timeSlot}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="purpose">Purpose of Visit *</label>
                <select
                  id="purpose"
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  className={errors.purpose ? 'error' : ''}
                >
                  <option value="">Select a purpose</option>
                  {APPOINTMENT_PURPOSES.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
                {errors.purpose && <span className="error-text">{errors.purpose}</span>}
              </div>
            </div>
          </div>

          <div className="form-section info-section">
            <h3>Important Information</h3>
            <div className="info-box">
              <p>
                <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM<br/>
                <strong>Location:</strong> BOSS Office, San Carlos City Hall<br/>
                <strong>Please arrive:</strong> 10 minutes before your scheduled time<br/>
                <strong>Required Documents:</strong> Valid ID and relevant business documents
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
