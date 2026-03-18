import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle, Plus, Upload, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import TaxYearCalendar from '../../components/TaxYearCalendar';
import SearchExistingBusiness from '../../components/SearchExistingBusiness';
import './NewRegistration.css';

const PAYMENT_MODES = ['Annual', 'Semi-Annual', 'Quarterly'];
const BUSINESS_LINES = [
  { id: 1, name: 'Trading/Retail', paxMin: 1, paxMax: 5, areaMin: 20, areaMax: 100 },
  { id: 2, name: 'Manufacturing', paxMin: 5, paxMax: 50, areaMin: 100, areaMax: 500 },
  { id: 3, name: 'Food Business', paxMin: 2, paxMax: 20, areaMin: 30, areaMax: 200 },
  { id: 4, name: 'Services', paxMin: 1, paxMax: 10, areaMin: 15, areaMax: 150 },
  { id: 5, name: 'Wholesale', paxMin: 5, paxMax: 30, areaMin: 100, areaMax: 300 },
  { id: 6, name: 'Spa/Salon', paxMin: 2, paxMax: 15, areaMin: 25, areaMax: 200 },
];

const REQUIRED_DOCUMENTS = [
  { id: 1, name: 'DTI/SEC/CDA Registration with COC', required: true },
  { id: 2, name: 'Tax Clearance', required: true },
  { id: 3, name: 'Contract of Lease', required: true },
  { id: 4, name: 'Barangay Clearance', required: false },
  { id: 5, name: 'Health/Sanitation Certificate', required: false },
  { id: 6, name: 'Environmental Compliance Certificate', required: false },
];

export default function LineOfBusiness() {
  const [currentStep, setCurrentStep] = useState(3);
  const [form, setForm] = useState({
    typeOfApplication: '',
    modeOfPayment: '',
    taxYear: new Date().getFullYear().toString(),
    generateBarangayClearance: false,
  });

  const [lineOfBusinessList, setLineOfBusinessList] = useState([]);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [uploads, setUploads] = useState({});
  const [errors, setErrors] = useState({});
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  // Load data from previous steps
  useEffect(() => {
    const step1Data = localStorage.getItem('bpls_step1');
    const step2Data = localStorage.getItem('bpls_step2');
    const step3Data = localStorage.getItem('bpls_step3');

    if (step1Data) {
      const parsed = JSON.parse(step1Data);
      setForm(prev => ({
        ...prev,
        typeOfApplication: parsed.typeOfApplication || '',
        modeOfPayment: parsed.modeOfPayment || '',
        taxYear: parsed.taxYear || new Date().getFullYear().toString(),
        generateBarangayClearance: parsed.generateBarangayClearance || false,
      }));
    }

    if (step3Data) {
      const parsed = JSON.parse(step3Data);
      setLineOfBusinessList(parsed.lineOfBusinessList || []);
      setUploads(parsed.uploads || {});
    }
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

  const handleAddLineOfBusiness = (lineId) => {
    const selectedBusiness = BUSINESS_LINES.find(b => b.id === lineId);
    if (!selectedBusiness) return;

    const newLine = {
      tempId: Date.now(),
      businessId: lineId,
      businessName: selectedBusiness.name,
      pax: selectedBusiness.paxMax,
      area: selectedBusiness.areaMax,
      grossSalesEstimate: '',
    };

    setLineOfBusinessList(prev => [...prev, newLine]);
    setSelectedLineId(newLine.tempId);
    toast.success(`${selectedBusiness.name} added`);
  };

  const handleUpdateLine = (tempId, field, value) => {
    setLineOfBusinessList(prev =>
      prev.map(line =>
        line.tempId === tempId ? { ...line, [field]: value } : line
      )
    );
  };

  const handleRemoveLine = (tempId) => {
    setLineOfBusinessList(prev => prev.filter(line => line.tempId !== tempId));
    setSelectedLineId(null);
    toast.info('Line of business removed');
  };

  const handleFileUpload = (e, docId) => {
    const file = e.target.files[0];
    if (file) {
      setUploads(prev => ({
        ...prev,
        [docId]: {
          name: file.name,
          size: file.size,
          type: file.type,
        }
      }));
      toast.success(`${file.name} uploaded`);
    }
  };

  const handleRemoveFile = (docId) => {
    setUploads(prev => {
      const updated = { ...prev };
      delete updated[docId];
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (lineOfBusinessList.length === 0) {
      newErrors.lineOfBusiness = 'At least one line of business is required';
    }

    // Check if all required documents are uploaded
    const requiredDocs = REQUIRED_DOCUMENTS.filter(d => d.required);
    for (const doc of requiredDocs) {
      if (!uploads[doc.id]) {
        newErrors[`doc_${doc.id}`] = 'Required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    const data = {
      ...form,
      lineOfBusinessList,
      uploads,
    };
    localStorage.setItem('bpls_step3', JSON.stringify(data));
    toast.info('Line of Business saved as draft');
  };

  const handlePrevious = () => {
    const data = { ...form, lineOfBusinessList, uploads };
    localStorage.setItem('bpls_step3', JSON.stringify(data));
    navigate('/BusinessOperation');
  };

  const handleNext = () => {
    if (validateForm()) {
      const data = { ...form, lineOfBusinessList, uploads };
      localStorage.setItem('bpls_step3', JSON.stringify(data));
      navigate('/Summary');
    } else {
      toast.error('Please complete all required fields');
    }
  };

  return (
    <div className="bpls-container">
      <SearchExistingBusiness
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectBusiness={handleSelectBusiness}
      />
      
      {/* Header */}
      <div className="bpls-header">
        <h1>BUSINESS PERMIT APPLICATIONS</h1>
        <div className="header-buttons">
          <button className="btn-draft" onClick={handleSaveDraft}>Save as Draft</button>
          {currentStep < 4 && (
            <button className="btn-next" onClick={handleNext}>
              Next <ArrowRight size={18} />
            </button>
          )}
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
            <TaxYearCalendar value={form.taxYear} onChange={handleChange} error={errors.taxYear} />

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
          <h2 className="section-title">LINE OF BUSINESS</h2>

          {errors.lineOfBusiness && (
            <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', marginBottom: '1.5rem' }}>
              {errors.lineOfBusiness}
            </div>
          )}

          {/* Add Line of Business Section */}
          <div className="add-business-section">
            <h3>Add Line of Business</h3>
            <div className="business-grid">
              {BUSINESS_LINES.map(business => (
                <div key={business.id} className="business-card">
                  <h4>{business.name}</h4>
                  <p className="business-detail">Pax: {business.paxMin}-{business.paxMax}</p>
                  <p className="business-detail">Area: {business.areaMin}-{business.areaMax} sq.m</p>
                  <button
                    className="btn-add-business"
                    onClick={() => handleAddLineOfBusiness(business.id)}
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Lines of Business */}
          {lineOfBusinessList.length > 0 && (
            <div className="selected-lines-section">
              <h3>Selected Lines of Business</h3>
              {lineOfBusinessList.map(line => (
                <div key={line.tempId} className="selected-line-card">
                  <div className="line-header">
                    <h4>{line.businessName}</h4>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveLine(line.tempId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="content-grid">
                    {/* Measure and Pax Card */}
                    <div className="info-card">
                      <h5>MEASURE AND PAX</h5>
                      <p className="card-note">This part is automatically filled based on the line of business selected.</p>
                      
                      <div className="form-input-group">
                        <label>Persons (Pax)</label>
                        <input
                          type="number"
                          value={line.pax}
                          onChange={(e) => handleUpdateLine(line.tempId, 'pax', e.target.value)}
                        />
                      </div>

                      <div className="form-input-group">
                        <label>Area (sq.m)</label>
                        <input
                          type="number"
                          value={line.area}
                          onChange={(e) => handleUpdateLine(line.tempId, 'area', e.target.value)}
                        />
                      </div>

                      <div className="form-input-group">
                        <label>Gross Sales Estimate (PHP)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={line.grossSalesEstimate}
                          onChange={(e) => handleUpdateLine(line.tempId, 'grossSalesEstimate', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Application Requirements Card */}
                    <div className="info-card">
                      <h5>APPLICATION REQUIREMENTS</h5>
                      <p className="card-note">The documentary requirements with asterisk (*) are required to upload</p>
                      
                      <div className="documents-list">
                        {REQUIRED_DOCUMENTS.map(doc => (
                          <div key={doc.id} className="document-item">
                            <label>
                              {doc.name}
                              {doc.required && <span className="required">*</span>}
                            </label>
                            
                            {uploads[doc.id] ? (
                              <div className="file-uploaded">
                                <span className="file-name">{uploads[doc.id].name}</span>
                                <button
                                  className="btn-remove-file"
                                  onClick={() => handleRemoveFile(doc.id)}
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <label className="upload-button">
                                <input
                                  type="file"
                                  hidden
                                  onChange={(e) => handleFileUpload(e, doc.id)}
                                />
                                <Upload size={16} />
                                Upload File
                              </label>
                            )}
                            {errors[`doc_${doc.id}`] && (
                              <span className="error-msg">{errors[`doc_${doc.id}`]}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="button-group">
            <button className="btn-prev" onClick={handlePrevious}>
              <ArrowLeft size={18} /> Previous
            </button>
            <button className="btn-next" onClick={handleNext}>
              Next <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
