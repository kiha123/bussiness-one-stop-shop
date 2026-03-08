import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import TaxYearCalendar from '../components/TaxYearCalendar';
import SearchExistingBusiness from '../components/SearchExistingBusiness';
import './NewRegistration.css';

const PAYMENT_MODES = ['Annual', 'Semi-Annual', 'Quarterly'];
const TAX_YEARS = ['2024', '2025', '2026', '2027'];
const BUSINESS_TYPES = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Cooperative'];
const GENDERS = ['Male', 'Female'];
const REGIONS = ['Ilocos Region', 'Cagayan Valley', 'Central Luzon', 'CALABARZON', 'Bicol Region'];
const PROVINCES = {
  'Ilocos Region': ['Ilocos Norte', 'Ilocos Sur', 'La Union', 'Pangasinan'],
  'Central Luzon': ['Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac'],
};
const CITIES = {
  'Pangasinan': ['San Carlos', 'Dagupan', 'Lingayen', 'Urdaneta'],
  'Bataan': ['Balanga', 'Mariveles'],
};
const BARANGAYS = {
  'San Carlos': ['Mabiling (Pob.)', 'Canarem', 'Suague'],
  'Balanga': ['Pob.', 'Anyataan'],
};

// Move component definitions outside to prevent recreating on each render
const FormInput = ({ label, name, type = 'text', placeholder = '', required = false, value, onChange, error }) => (
  <div className="form-input-group">
    <label>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'input-error' : ''}
    />
    {error && <span className="error-msg">{error}</span>}
  </div>
);

const FormSelect = ({ label, name, options, required = false, value, onChange, error }) => (
  <div className="form-input-group">
    <label>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'input-error' : ''}
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <span className="error-msg">{error}</span>}
  </div>
);

export default function NewRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    typeOfApplication: '',
    modeOfPayment: '',
    taxYear: '',
    generateBarangayClearance: false,
    businessName: '',
    tradeName: '',
    typeOfOrganization: '',
    sex: '',
    dtiNumber: '',
    tin: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    region: '',
    province: '',
    cityMunicipality: '',
    barangay: '',
    houseNumber: '',
    buildingName: '',
    lotNo: '',
    blockNo: '',
    street: '',
    subdivision: '',
    zipCode: '',
    mobileNumber: '',
    telephoneNumber: '',
    emailAddress: '',
  });

  const [errors, setErrors] = useState({});
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  // Load previously saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('bpls_step1');
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.typeOfApplication) newErrors.typeOfApplication = 'Required';
    if (!form.modeOfPayment) newErrors.modeOfPayment = 'Required';
    if (!form.taxYear) newErrors.taxYear = 'Required';
    if (!form.businessName.trim()) newErrors.businessName = 'Required';
    if (!form.typeOfOrganization) newErrors.typeOfOrganization = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.region) newErrors.region = 'Required';
    if (!form.province) newErrors.province = 'Required';
    if (!form.cityMunicipality) newErrors.cityMunicipality = 'Required';
    if (!form.barangay) newErrors.barangay = 'Required';
    if (!form.zipCode.trim()) newErrors.zipCode = 'Required';
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Required';
    if (!form.emailAddress.trim()) newErrors.emailAddress = 'Required';

    if (form.mobileNumber && !/^09\d{9}$/.test(form.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Must start with 09 and contain 11 digits';
    }
    if (form.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress)) {
      newErrors.emailAddress = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectBusiness = (business) => {
    // Populate form with selected business data
    setForm(prev => ({
      ...prev,
      businessName: business.business_name || '',
      taxYear: business.taxYear || '',
      typeOfApplication: 'Renewal',
      dtiNumber: business.dti_number || '',
      firstName: business.step1Data?.firstName || '',
      lastName: business.step1Data?.lastName || '',
      emailAddress: business.step1Data?.emailAddress || '',
      mobileNumber: business.step1Data?.mobileNumber || '',
      // Add other fields as needed
    }));
    toast.success('Business loaded successfully!');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('bpls_step1', JSON.stringify(form));
    toast.info('Application saved as draft');
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('bpls_step1', JSON.stringify(form));
      navigate('/BusinessOperation');
    } else {
      toast.error('Please fill all required fields');
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
            <FormSelect name="modeOfPayment" label="" options={PAYMENT_MODES} required value={form.modeOfPayment} onChange={handleChange} error={errors.modeOfPayment} />

            <div className="info-alert">
              <AlertCircle size={18} />
              <p>The tax year of the application will be based on the intended year of the application that will be processed.</p>
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
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2 className="section-title">BUSINESS INFORMATION</h2>

          <div className="content-grid">
            {/* Card 1: Business Information */}
            <div className="info-card">
              <h3>BUSINESS INFORMATION</h3>
              <FormInput label="Business Name" name="businessName" placeholder="Enter business name" required value={form.businessName} onChange={handleChange} error={errors.businessName} />
              <FormInput label="Trade Name / Franchise" name="tradeName" placeholder="If different from business name" value={form.tradeName} onChange={handleChange} error={errors.tradeName} />
              <FormSelect label="Type of Organization" name="typeOfOrganization" options={BUSINESS_TYPES} required value={form.typeOfOrganization} onChange={handleChange} error={errors.typeOfOrganization} />
              
              <div className="radio-group" style={{ marginTop: '1rem' }}>
                <label style={{ marginBottom: '0.5rem' }}>Sex</label>
                {GENDERS.map(option => (
                  <label key={option} className="radio-item">
                    <input
                      type="radio"
                      name="sex"
                      value={option}
                      checked={form.sex === option}
                      onChange={handleChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              <FormInput label="DTI Registration Number" name="dtiNumber" value={form.dtiNumber} onChange={handleChange} error={errors.dtiNumber} />
              <FormInput label="TIN" name="tin" value={form.tin} onChange={handleChange} error={errors.tin} />
            </div>

            {/* Card 2: Owner Information */}
            <div className="info-card">
              <h3>NAME OF OWNER</h3>
              <FormInput label="Last Name" name="lastName" required value={form.lastName} onChange={handleChange} error={errors.lastName} />
              <FormInput label="First Name" name="firstName" required value={form.firstName} onChange={handleChange} error={errors.firstName} />
              <FormInput label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} error={errors.middleName} />
              <FormInput label="Suffix" name="suffix" placeholder="Jr., Sr., III" value={form.suffix} onChange={handleChange} error={errors.suffix} />
            </div>

            {/* Card 3: Main Office Address */}
            <div className="info-card">
              <h3>MAIN OFFICE ADDRESS</h3>
              <FormSelect label="Region" name="region" options={REGIONS} required value={form.region} onChange={handleChange} error={errors.region} />
              <FormSelect
                label="Province"
                name="province"
                options={form.region ? PROVINCES[form.region] || [] : []}
                required
                value={form.province}
                onChange={handleChange}
                error={errors.province}
              />
              <FormSelect
                label="City / Municipality"
                name="cityMunicipality"
                options={form.province ? CITIES[form.province] || [] : []}
                required
                value={form.cityMunicipality}
                onChange={handleChange}
                error={errors.cityMunicipality}
              />
              <FormSelect
                label="Barangay"
                name="barangay"
                options={form.cityMunicipality ? BARANGAYS[form.cityMunicipality] || [] : []}
                required
                value={form.barangay}
                onChange={handleChange}
                error={errors.barangay}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput label="House / Bldg No" name="houseNumber" value={form.houseNumber} onChange={handleChange} error={errors.houseNumber} />
                <FormInput label="Name of Building" name="buildingName" value={form.buildingName} onChange={handleChange} error={errors.buildingName} />
                <FormInput label="Lot No" name="lotNo" value={form.lotNo} onChange={handleChange} error={errors.lotNo} />
                <FormInput label="Block No" name="blockNo" value={form.blockNo} onChange={handleChange} error={errors.blockNo} />
              </div>

              <FormInput label="Street" name="street" value={form.street} onChange={handleChange} error={errors.street} />
              <FormInput label="Subdivision" name="subdivision" value={form.subdivision} onChange={handleChange} error={errors.subdivision} />
              <FormInput label="Zip Code" name="zipCode" required value={form.zipCode} onChange={handleChange} error={errors.zipCode} />
            </div>

            {/* Card 4: Contact Information */}
            <div className="info-card">
              <h3>CONTACT INFORMATION</h3>
              <FormInput label="Mobile No." name="mobileNumber" placeholder="09636020402" required value={form.mobileNumber} onChange={handleChange} error={errors.mobileNumber} />
              <FormInput label="Telephone No." name="telephoneNumber" value={form.telephoneNumber} onChange={handleChange} error={errors.telephoneNumber} />
              <FormInput label="Email Address" name="emailAddress" type="email" placeholder="kevinvega@gmail.com" required value={form.emailAddress} onChange={handleChange} error={errors.emailAddress} />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="button-group">
            <button className="btn-next" onClick={handleNext}>Next →</button>
            <button className="btn-draft" onClick={handleSaveDraft}>Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}

