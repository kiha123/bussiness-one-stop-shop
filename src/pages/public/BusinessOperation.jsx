import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import TaxYearCalendar from '../../components/TaxYearCalendar';
import SearchExistingBusiness from '../../components/SearchExistingBusiness';
import './NewRegistration.css';

const PAYMENT_MODES = ['Annual', 'Semi-Annual', 'Quarterly'];
const TAX_YEARS = ['2024', '2025', '2026', '2027'];
const BUSINESS_ACTIVITIES = ['Retail', 'Wholesale', 'Manufacturing', 'Service', 'Food Business', 'Other'];
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

function FormInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  error,
}) {
  return (
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
}

function FormSelect({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  error,
}) {
  return (
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
}

export default function BusinessOperation() {
  const [currentStep, setCurrentStep] = useState(2);
  const [sameAsMainOffice, setSameAsMainOffice] = useState(false);
  const [form, setForm] = useState({
    typeOfApplication: '',
    modeOfPayment: '',
    taxYear: '',
    generateBarangayClearance: false,
    businessActivity: '',
    businessAreaSqm: '',
    totalFloorArea: '',
    maleEmployees: '',
    femaleEmployees: '',
    employeesWithinLgu: '',
    vanTruckCount: '',
    motorcycleCount: '',
    propertyOwned: '',
    taxIncentives: '',
    operationRegion: '',
    operationProvince: '',
    operationCity: '',
    operationBarangay: '',
    operationZipCode: '',
    houseNumber: '',
    buildingName: '',
    lotNo: '',
    blockNo: '',
    street: '',
    subdivision: '',
  });

  const [errors, setErrors] = useState({});
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  // Load Step 1 data from localStorage if available
  useEffect(() => {
    const step1Data = localStorage.getItem('bpls_step1');
    if (step1Data) {
      const parsedData = JSON.parse(step1Data);
      setForm(prev => ({
        ...prev,
        typeOfApplication: parsedData.typeOfApplication || '',
        modeOfPayment: parsedData.modeOfPayment || '',
        taxYear: parsedData.taxYear || '',
        generateBarangayClearance: parsedData.generateBarangayClearance || false,
      }));
    }
    const step2Data = localStorage.getItem('bpls_step2');
    if (step2Data) {
      setForm(JSON.parse(step2Data));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.businessActivity) newErrors.businessActivity = 'Required';
    if (!form.businessAreaSqm) newErrors.businessAreaSqm = 'Required';
    if (form.businessAreaSqm && isNaN(form.businessAreaSqm)) newErrors.businessAreaSqm = 'Must be a number';
    if (form.totalFloorArea && isNaN(form.totalFloorArea)) newErrors.totalFloorArea = 'Must be a number';
    if (form.maleEmployees && isNaN(form.maleEmployees)) newErrors.maleEmployees = 'Must be a number';
    if (form.femaleEmployees && isNaN(form.femaleEmployees)) newErrors.femaleEmployees = 'Must be a number';
    if (form.employeesWithinLgu && isNaN(form.employeesWithinLgu)) newErrors.employeesWithinLgu = 'Must be a number';
    if (form.vanTruckCount && isNaN(form.vanTruckCount)) newErrors.vanTruckCount = 'Must be a number';
    if (form.motorcycleCount && isNaN(form.motorcycleCount)) newErrors.motorcycleCount = 'Must be a number';
    if (!form.propertyOwned) newErrors.propertyOwned = 'Required';
    if (!form.taxIncentives) newErrors.taxIncentives = 'Required';
    
    if (!sameAsMainOffice) {
      if (!form.operationRegion) newErrors.operationRegion = 'Required';
      if (!form.operationProvince) newErrors.operationProvince = 'Required';
      if (!form.operationCity) newErrors.operationCity = 'Required';
      if (!form.operationBarangay) newErrors.operationBarangay = 'Required';
      if (!form.operationZipCode) newErrors.operationZipCode = 'Required';
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
      taxYear: business.taxYear || '',
      typeOfApplication: 'Renewal',
      // Add other fields as needed from the business object
    }));
    toast.success('Business loaded successfully!');
  };

  const handleSameAsMainOffice = (e) => {
    setSameAsMainOffice(e.target.checked);
    if (e.target.checked) {
      // Fetch Step 1 data and copy address
      const step1Data = localStorage.getItem('bpls_step1');
      if (step1Data) {
        const parsedData = JSON.parse(step1Data);
        setForm(prev => ({
          ...prev,
          operationRegion: parsedData.region || '',
          operationProvince: parsedData.province || '',
          operationCity: parsedData.cityMunicipality || '',
          operationBarangay: parsedData.barangay || '',
          operationZipCode: parsedData.zipCode || '',
          houseNumber: parsedData.houseNumber || '',
          buildingName: parsedData.buildingName || '',
          lotNo: parsedData.lotNo || '',
          blockNo: parsedData.blockNo || '',
          street: parsedData.street || '',
          subdivision: parsedData.subdivision || '',
        }));
      }
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('bpls_step2', JSON.stringify(form));
    toast.info('Business Operation saved as draft');
  };

  const handlePrevious = () => {
    localStorage.setItem('bpls_step2', JSON.stringify(form));
    navigate('/NewRegistration');
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('bpls_step2', JSON.stringify(form));
      navigate('/LineOfBusiness');
    } else {
      toast.error('Please fill all required fields correctly');
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
            <FormSelect
              name="modeOfPayment"
              label=""
              options={PAYMENT_MODES}
              value={form.modeOfPayment}
              onChange={handleChange}
              error={errors.modeOfPayment}
            />

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
          <h2 className="section-title">BUSINESS OPERATION</h2>

          <div className="content-grid">
            {/* Card 1: Business Operation */}
            <div className="info-card">
              <h3>BUSINESS OPERATION</h3>
              <FormSelect
                label="Business Activity"
                name="businessActivity"
                options={BUSINESS_ACTIVITIES}
                required
                value={form.businessActivity}
                onChange={handleChange}
                error={errors.businessActivity}
              />
              <FormInput
                label="Business Area (sq.m)"
                name="businessAreaSqm"
                type="number"
                placeholder="0"
                required
                value={form.businessAreaSqm}
                onChange={handleChange}
                error={errors.businessAreaSqm}
              />
              <FormInput
                label="Total Floor Area"
                name="totalFloorArea"
                type="number"
                placeholder="0"
                value={form.totalFloorArea}
                onChange={handleChange}
                error={errors.totalFloorArea}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput label="Male Employees" name="maleEmployees" type="number" placeholder="0" value={form.maleEmployees} onChange={handleChange} error={errors.maleEmployees} />
                <FormInput label="Female Employees" name="femaleEmployees" type="number" placeholder="0" value={form.femaleEmployees} onChange={handleChange} error={errors.femaleEmployees} />
              </div>

              <FormInput label="Total No. of Employees Residing within the LGU" name="employeesWithinLgu" type="number" placeholder="0" value={form.employeesWithinLgu} onChange={handleChange} error={errors.employeesWithinLgu} />

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ marginBottom: '0.75rem', display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>Number of Delivery Vehicles</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormInput label="Van / Truck" name="vanTruckCount" type="number" placeholder="0" value={form.vanTruckCount} onChange={handleChange} error={errors.vanTruckCount} />
                  <FormInput label="Motorcycle" name="motorcycleCount" type="number" placeholder="0" value={form.motorcycleCount} onChange={handleChange} error={errors.motorcycleCount} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ marginBottom: '0.75rem', display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                  OWNED? <span className="required">*</span>
                </label>
                <div className="radio-group">
                  {['Yes', 'No'].map(option => (
                    <label key={option} className="radio-item">
                      <input
                        type="radio"
                        name="propertyOwned"
                        value={option}
                        checked={form.propertyOwned === option}
                        onChange={handleChange}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.propertyOwned && <span className="error-msg">{errors.propertyOwned}</span>}
              </div>

              <div>
                <label style={{ marginBottom: '0.75rem', display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                  Do you have tax incentives from any government entity? <span className="required">*</span>
                </label>
                <div className="radio-group">
                  {['Yes', 'No'].map(option => (
                    <label key={option} className="radio-item">
                      <input
                        type="radio"
                        name="taxIncentives"
                        value={option}
                        checked={form.taxIncentives === option}
                        onChange={handleChange}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.taxIncentives && <span className="error-msg">{errors.taxIncentives}</span>}
              </div>
            </div>

            {/* Card 2: Business Location Address */}
            <div className="info-card">
              <h3>BUSINESS LOCATION ADDRESS</h3>
              
              <label className="checkbox-item" style={{ marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  checked={sameAsMainOffice}
                  onChange={handleSameAsMainOffice}
                />
                <span>Same as Main Office</span>
              </label>

              {!sameAsMainOffice && (
                <>
                  <FormSelect label="Region" name="operationRegion" options={REGIONS} required value={form.operationRegion} onChange={handleChange} error={errors.operationRegion} />
                  <FormSelect
                    label="Province"
                    name="operationProvince"
                    options={form.operationRegion ? PROVINCES[form.operationRegion] || [] : []}
                    required
                    value={form.operationProvince}
                    onChange={handleChange}
                    error={errors.operationProvince}
                  />
                  <FormSelect
                    label="City / Municipality"
                    name="operationCity"
                    options={form.operationProvince ? CITIES[form.operationProvince] || [] : []}
                    required
                    value={form.operationCity}
                    onChange={handleChange}
                    error={errors.operationCity}
                  />
                  <FormSelect
                    label="Barangay"
                    name="operationBarangay"
                    options={form.operationCity ? BARANGAYS[form.operationCity] || [] : []}
                    required
                    value={form.operationBarangay}
                    onChange={handleChange}
                    error={errors.operationBarangay}
                  />
                  <FormInput label="Zip Code" name="operationZipCode" placeholder="Enter zip code" required value={form.operationZipCode} onChange={handleChange} error={errors.operationZipCode} />
                </>
              )}

              {sameAsMainOffice && (
                <div className="copied-address-info">
                  <p><strong>Region:</strong> {form.operationRegion || 'Not set'}</p>
                  <p><strong>Province:</strong> {form.operationProvince || 'Not set'}</p>
                  <p><strong>City / Municipality:</strong> {form.operationCity || 'Not set'}</p>
                  <p><strong>Barangay:</strong> {form.operationBarangay || 'Not set'}</p>
                  <p><strong>Zip Code:</strong> {form.operationZipCode || 'Not set'}</p>
                </div>
              )}

              <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '0.95rem', fontWeight: '600', color: '#374151' }}>Additional Details</h4>
              <FormInput label="House / Bldg. No" name="houseNumber" value={form.houseNumber} onChange={handleChange} error={errors.houseNumber} />
              <FormInput label="Name of Building" name="buildingName" value={form.buildingName} onChange={handleChange} error={errors.buildingName} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput label="Lot No" name="lotNo" value={form.lotNo} onChange={handleChange} error={errors.lotNo} />
                <FormInput label="Block No" name="blockNo" value={form.blockNo} onChange={handleChange} error={errors.blockNo} />
              </div>
              <FormInput label="Street Address" name="street" value={form.street} onChange={handleChange} error={errors.street} />
              <FormInput label="Subdivision" name="subdivision" value={form.subdivision} onChange={handleChange} error={errors.subdivision} />
            </div>
          </div>

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
