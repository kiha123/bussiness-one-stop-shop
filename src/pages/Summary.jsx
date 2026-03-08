import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Download, Send, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import TaxYearCalendar from '../components/TaxYearCalendar';
import SearchExistingBusiness from '../components/SearchExistingBusiness';
import './NewRegistration.css';

// Initialize EmailJS
emailjs.init({
  publicKey: 'y3YQP2yUq61urL_8c', // Replace with your EmailJS public key
});

const PAYMENT_MODES = ['Annual', 'Semi-Annual', 'Quarterly'];

// Generate a unique tracking code
const generateTrackingCode = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BPLS-${timestamp}-${random}`;
};

export default function Summary() {
  const [currentStep, setCurrentStep] = useState(4);
  const [trackingCode, setTrackingCode] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [form, setForm] = useState({
    typeOfApplication: '',
    modeOfPayment: '',
    taxYear: new Date().getFullYear().toString(),
    generateBarangayClearance: false,
  });

  const [step1Data, setStep1Data] = useState(null);
  const [step2Data, setStep2Data] = useState(null);
  const [step3Data, setStep3Data] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  // Load all data from localStorage
  useEffect(() => {
    const s1 = localStorage.getItem('bpls_step1');
    const s2 = localStorage.getItem('bpls_step2');
    const s3 = localStorage.getItem('bpls_step3');

    if (s1) {
      const parsed = JSON.parse(s1);
      setStep1Data(parsed);
      setForm(prev => ({
        ...prev,
        typeOfApplication: parsed.typeOfApplication || '',
        modeOfPayment: parsed.modeOfPayment || '',
        taxYear: parsed.taxYear || new Date().getFullYear().toString(),
        generateBarangayClearance: parsed.generateBarangayClearance || false,
      }));
    }

    if (s2) setStep2Data(JSON.parse(s2));
    if (s3) setStep3Data(JSON.parse(s3));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectBusiness = (business) => {
    // Populate form with selected business data
    setForm(prev => ({
      ...prev,
      taxYear: business.taxYear || '',
      typeOfApplication: 'Renewal',
      // Add other fields as needed from the business object
    }));
    toast.success('Business loaded successfully!');
  };

  const handleSaveDraft = () => {
    const data = {
      ...form,
      step1Data,
      step2Data,
      step3Data,
    };
    localStorage.setItem('bpls_summary', JSON.stringify(data));
    toast.info('Application saved as draft');
  };

  const handlePrevious = () => {
    navigate('/LineOfBusiness');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate tracking code
      const code = generateTrackingCode();
      
      // Create application data with tracking code
      const applicationData = {
        trackingCode: code,
        ...form,
        // Flatten step1Data for easier access
        business_name: step1Data?.businessName || '',
        owner_name: step1Data ? `${step1Data.firstName} ${step1Data.lastName}` : '',
        business_type: step1Data?.typeOfOrganization || '',
        email: step1Data?.emailAddress || '',
        contact_number: step1Data?.mobileNumber || '',
        dti_number: step1Data?.dtiNumber || '',
        tin: step1Data?.tin || '',
        // Store full nested data too for detailed views
        step1Data,
        step2Data,
        step3Data,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
      };

      // Store application
      const applications = JSON.parse(localStorage.getItem('bpls_applications') || '[]');
      applications.push(applicationData);
      localStorage.setItem('bpls_applications', JSON.stringify(applications));

      console.log('Submitting application:', applicationData);

      // Send tracking code to email
      if (applicationData.email) {
        try {
          await emailjs.send(
            'service_3okyis7' , // Replace with your EmailJS service ID
            'template_i2u0p8p', // Replace with your EmailJS template ID
            {
              to_email: applicationData.email,
              to_name: applicationData.owner_name,
              tracking_code: code,
              business_name: applicationData.business_name,
              contact_number: applicationData.contact_number,
              submitted_date: new Date().toLocaleDateString(),
            }
          );
          toast.success('Tracking code sent to your email!');
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          toast.warning('Application submitted, but email could not be sent. You can still track using: ' + code);
        }
      }

      // Show tracking code and confirmation
      setTrackingCode(code);
      setShowConfirmation(true);
      
      // Clear form localStorage
      localStorage.removeItem('bpls_step1');
      localStorage.removeItem('bpls_step2');
      localStorage.removeItem('bpls_step3');
      localStorage.removeItem('bpls_summary');
    } catch (error) {
      toast.error('Error submitting application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTracking = () => {
    if (trackingCode) {
      navigator.clipboard.writeText(trackingCode);
      toast.success('Tracking code copied to clipboard!');
    }
  };

  const handleGoHome = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  const handleDownloadPDF = () => {
    toast.info('PDF download feature coming soon');
  };

  return (
    <div className="bpls-container">
      <SearchExistingBusiness
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectBusiness={handleSelectBusiness}
      />
      
      {/* Confirmation Modal */}
      {showConfirmation && trackingCode && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <CheckCircle size={48} style={{ color: '#10b981', marginBottom: '20px' }} />
            <h2 style={{ color: '#10b981', marginBottom: '10px' }}>Application Submitted Successfully!</h2>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>
              Your business permit application has been received and is now being processed.
            </p>
            
            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '30px',
              border: '2px solid #10b981',
            }}>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 10px 0' }}>Your Tracking Code:</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <code style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  letterSpacing: '2px',
                }}>{trackingCode}</code>
                <button
                  onClick={handleCopyTracking}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#10b981',
                    padding: '0',
                  }}
                  title="Copy tracking code"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '14px' }}>
              Please save your tracking code for your records. You will receive an email update about your application status.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={handleGoHome}
                style={{
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}

      {!showConfirmation && (
        <div>
          {/* Header */}
          <div className="bpls-header">
            <h1>BUSINESS PERMIT APPLICATIONS</h1>
            <div className="header-buttons">
              <button className="btn-draft" onClick={handleDownloadPDF}>
                <Download size={18} /> Download PDF
              </button>
              <button 
                className="btn-next" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Submit <Send size={18} />
                  </>
                )}
            </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
        {[
          { id: 1, label: 'Business Information and Registration', icon: '1️⃣' },
          { id: 2, label: 'Business Operation', icon: '2️⃣' },
          { id: 3, label: 'Line of Business', icon: '3️⃣' },
          { id: 4, label: 'Summary', icon: '4️⃣' },
        ].map(step => (
          <div key={step.id} className={`progress-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
            <div className="progress-icon">{step.icon}</div>
            <span className="progress-label">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="bpls-layout">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <div className="sidebar-card">
            <h2 style={{ marginTop: 0, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Business Permit Applications</h2>

            <h3>TYPE OF APPLICATION</h3>
            <div className="radio-group">
              {['New', 'Renewal', 'Additional'].map(option => (
                <label key={option} className="radio-item">
                  <input
                    type="radio"
                    name="typeOfApplication"
                    value={option}
                    checked={form.typeOfApplication === option}
                    onChange={handleChange}
                    disabled
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {form.typeOfApplication === 'Renewal' && (
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '16px',
                borderRadius: '6px',
                marginTop: '1.5rem',
                border: '1px solid #d1d5db',
              }}>
                <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>REMINDERS FOR RENEWAL:</h4>
                <ol style={{ marginBottom: '16px', paddingLeft: '20px', color: '#374151', fontSize: '13px', lineHeight: '1.6' }}>
                  <li style={{ marginBottom: '8px' }}>
                    For those applications with existing details in the system, kindly use <strong>Search Existing Business</strong> function to search the business to be renewed
                  </li>
                  <li>
                    To search for an existing business, use the <strong>Business Identification No. (BIN)</strong>
                  </li>
                </ol>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => toast.info('Link Business feature coming soon')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#fff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#374151',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9fafb';
                      e.target.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#fff';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    🔗 Link Business
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSearchModal(true)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#0891b2',
                      color: '#fff',
                      border: '1px solid #0891b2',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#0570a0';
                      e.target.style.borderColor = '#0570a0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#0891b2';
                      e.target.style.borderColor = '#0891b2';
                    }}
                  >
                    🔍 Search Existing Business
                  </button>
                </div>
              </div>
            )}

            <h3 style={{ marginTop: '1.5rem' }}>MODE OF PAYMENT</h3>
            <div className="form-input-group">
              <select
                name="modeOfPayment"
                value={form.modeOfPayment}
                onChange={handleChange}
              >
                <option value="">Select Mode</option>
                {PAYMENT_MODES.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            <h3 style={{ marginTop: '1.5rem' }}>TAX YEAR</h3>
            <TaxYearCalendar value={form.taxYear} onChange={handleChange} error={undefined} />

            <label className="checkbox-item" style={{ marginTop: '1.5rem' }}>
              <input
                type="checkbox"
                name="generateBarangayClearance"
                checked={form.generateBarangayClearance}
                onChange={handleChange}
              />
              <span>Generate Barangay Clearance</span>
            </label>

            <div className="info-alert" style={{ marginTop: '1.5rem' }}>
              <AlertCircle size={18} />
              <p>The tax year of the application will be based on the intended year of the application that will be processed.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2 className="section-title">SUMMARY</h2>

          {/* Official Form Template */}
          <div style={{ 
            border: '2px solid #000',
            padding: '30px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            backgroundColor: '#fff'
          }}>
            {/* Form Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>UNIFIED APPLICATION FORM FOR BUSINESS PERMIT</h2>
              <p style={{ margin: '0', fontSize: '11px' }}>City of San Carlos</p>
            </div>

            {/* Application Type Section */}
            <table style={{ width: '100%', marginBottom: '10px', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px', width: '50%' }}>
                    <strong>Type of Application:</strong> {form.typeOfApplication}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '5px', width: '50%' }}>
                    <strong>Date of Receipt:</strong> _________________
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>
                    <strong>Mode of Payment:</strong> {form.modeOfPayment}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>
                    <strong>Processing Number:</strong> _________________
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>
                    <strong>Tax Year:</strong> {form.taxYear}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>
                    <strong>LGU Signature:</strong> _________________
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Section 1: Business Information and Registration */}
            {step1Data && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
                  I. BUSINESS INFORMATION AND REGISTRATION
                </div>
                
                <table style={{ width: '100%', marginBottom: '10px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '50%' }}>
                        <strong>Business Name:</strong><br />
                        {step1Data.businessName}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '50%' }}>
                        <strong>Trade Name/Franchise:</strong><br />
                        {step1Data.tradeName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Type of Organization:</strong><br />
                        {step1Data.typeOfOrganization}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Sex:</strong> {step1Data.sex}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>DTI Registration No.:</strong><br />
                        {step1Data.dtiNumber}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>TIN:</strong><br />
                        {step1Data.tin}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
                  NAME OF OWNER/PROPRIETOR
                </div>
                
                <table style={{ width: '100%', marginBottom: '10px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>
                        <strong>Surname:</strong><br />
                        {step1Data.lastName}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>
                        <strong>Given Name:</strong><br />
                        {step1Data.firstName}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>
                        <strong>Middle Name:</strong><br />
                        {step1Data.middleName}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>
                        <strong>Suffix:</strong><br />
                        {step1Data.suffix}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
                  MAIN OFFICE ADDRESS
                </div>
                
                <table style={{ width: '100%', marginBottom: '10px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '50%' }}>
                        <strong>House/Bldg No.:</strong> {step1Data.houseNumber}<br/>
                        <strong>Barangay:</strong> {step1Data.barangay}<br/>
                        <strong>City/Municipality:</strong> {step1Data.cityMunicipality}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px', width: '50%' }}>
                        <strong>Province:</strong> {step1Data.province}<br/>
                        <strong>Region:</strong> {step1Data.region}<br/>
                        <strong>Zip Code:</strong> {step1Data.zipCode}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Mobile No.:</strong> {step1Data.mobileNumber} &nbsp;&nbsp; 
                        <strong>Email:</strong> {step1Data.emailAddress}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Section 2: Business Operation */}
            {step2Data && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
                  II. BUSINESS OPERATION
                </div>
                
                <table style={{ width: '100%', marginBottom: '10px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Business Activity:</strong> {step2Data.businessActivity}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Business Area (sq.m):</strong> {step2Data.businessAreaSqm}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Male Employees:</strong> {step2Data.maleEmployees}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Female Employees:</strong> {step2Data.femaleEmployees}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Property Owned:</strong> {step2Data.propertyOwned}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        <strong>Tax Incentives:</strong> {step2Data.taxIncentives}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Section 3: Line of Business */}
            {step3Data && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
                  III. LINE OF BUSINESS
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ border: '1px solid #000', padding: '5px', textAlign: 'left' }}>Type of Business</th>
                      <th style={{ border: '1px solid #000', padding: '5px', textAlign: 'left' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        {step3Data.businessType || 'N/A'}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '8px' }}>
                        {step3Data.details || 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Declaration */}
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000', fontSize: '10px', lineHeight: '1.4' }}>
              <strong>DECLARATION:</strong> I hereby certify under penalty of perjury that the information I am furnishing is true and correct based on my personal knowledge and authentic records. I am aware that for any false, misleading information supplied, or production of fraudulent documents that the grounds for appropriate legal action against me or my duly authorized representative. Any administrative reviews or permits issued may be processed, revoked or denied in flagrantly violate the provisions of the National Internal Revenue Code (NIRC) and implementing rules and regulations.
            </div>

            {/* Signature Section */}
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderTop: '1px solid #000', paddingTop: '5px', height: '60px' }}>
                </div>
                <strong>Signature of Applicant/Owner Over Printed Name</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderTop: '1px solid #000', paddingTop: '5px', height: '60px' }}>
                </div>
                <strong>Designation/Position/Title</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group" style={{ marginTop: '20px' }}>
            <button 
              className="btn-draft" 
              onClick={handlePrevious}
              style={{ marginRight: '10px' }}
            >
              ← Previous
            </button>
            <button className="btn-draft" onClick={handleSaveDraft}>Save as Draft</button>
            <button 
              className="btn-next" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Submit <Send size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
}
