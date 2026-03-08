import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import './SearchExistingBusiness.css';

export default function SearchExistingBusiness({ isOpen, onClose, onSelectBusiness }) {
  const [searchParams, setSearchParams] = useState({
    bin: '',
    businessName: '',
    businessAddress: '',
    ownerName: '',
    typeOfApplication: '',
    taxYear: '',
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'applicationDate',
    direction: 'desc',
  });

  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Load businesses from localStorage on component mount
  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('bpls_applications') || '[]');
    setBusinesses(applications);
    setFilteredBusinesses(applications);
  }, [isOpen]);

  // Filter businesses based on search params
  useEffect(() => {
    let filtered = businesses.filter(app => {
      const bin = app.dti_number || '';
      const businessName = app.business_name || '';
      const address = app.step1Data?.street || '';
      const owner = app.owner_name || '';
      const appType = app.typeOfApplication || '';
      const taxYear = app.taxYear || '';

      return (
        (!searchParams.bin || bin.toLowerCase().includes(searchParams.bin.toLowerCase())) &&
        (!searchParams.businessName || businessName.toLowerCase().includes(searchParams.businessName.toLowerCase())) &&
        (!searchParams.businessAddress || address.toLowerCase().includes(searchParams.businessAddress.toLowerCase())) &&
        (!searchParams.ownerName || owner.toLowerCase().includes(searchParams.ownerName.toLowerCase())) &&
        (!searchParams.typeOfApplication || appType === searchParams.typeOfApplication) &&
        (!searchParams.taxYear || taxYear === searchParams.taxYear)
      );
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = '';
        let bVal = '';

        if (sortConfig.key === 'bin') {
          aVal = a.dti_number || '';
          bVal = b.dti_number || '';
        } else if (sortConfig.key === 'businessName') {
          aVal = a.business_name || '';
          bVal = b.business_name || '';
        } else if (sortConfig.key === 'applicationDate') {
          aVal = new Date(a.submittedAt || 0).getTime();
          bVal = new Date(b.submittedAt || 0).getTime();
        }

        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredBusinesses(filtered);
  }, [searchParams, sortConfig, businesses]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectBusiness = (business) => {
    if (onSelectBusiness) {
      onSelectBusiness(business);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="search-modal-header">
          <h2>Search Existing Business</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Note Section */}
        <div className="note-section">
          <h3>NOTE:</h3>
          <ol>
            <li>Application with <strong>GREEN NOW</strong> are not allowed to renew. Please check the Treasury for the remaining balances.</li>
            <li>Applications that do not have a <strong>TAX YEAR</strong> will not be loaded for renewal. Kindly update the application.</li>
          </ol>
        </div>

        {/* Search Form */}
        <div className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label>BIN</label>
              <input
                type="text"
                name="bin"
                value={searchParams.bin}
                onChange={handleSearchChange}
                placeholder="Business ID Number"
              />
            </div>
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                name="businessName"
                value={searchParams.businessName}
                onChange={handleSearchChange}
                placeholder="Business Name"
              />
            </div>
            <div className="form-group">
              <label>Business Address</label>
              <input
                type="text"
                name="businessAddress"
                value={searchParams.businessAddress}
                onChange={handleSearchChange}
                placeholder="Business Address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Name of Owner/Applicant</label>
              <input
                type="text"
                name="ownerName"
                value={searchParams.ownerName}
                onChange={handleSearchChange}
                placeholder="Owner/Applicant Name"
              />
            </div>
            <div className="form-group">
              <label>Type of Application</label>
              <select
                name="typeOfApplication"
                value={searchParams.typeOfApplication}
                onChange={handleSearchChange}
              >
                <option value="">-- Select All --</option>
                <option value="New">New</option>
                <option value="Renewal">Renewal</option>
                <option value="Additional">Additional</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tax Year</label>
              <input
                type="text"
                name="taxYear"
                value={searchParams.taxYear}
                onChange={handleSearchChange}
                placeholder="Tax Year"
              />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="results-table-container">
          {filteredBusinesses.length === 0 ? (
            <div className="no-results">No results found.</div>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th onClick={() => handleSort('bin')} style={{ cursor: 'pointer' }}>
                    <span>BIN</span>
                    {sortConfig.key === 'bin' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('businessName')} style={{ cursor: 'pointer' }}>
                    <span>Business Name</span>
                    {sortConfig.key === 'businessName' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th>Business Address</th>
                  <th>Name of Owner/Applicant</th>
                  <th>Type of Application</th>
                  <th>Tax Year</th>
                  <th onClick={() => handleSort('applicationDate')} style={{ cursor: 'pointer' }}>
                    <span>Application Date</span>
                    {sortConfig.key === 'applicationDate' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBusinesses.map((business, index) => (
                  <tr key={business.trackingCode || index}>
                    <td>{index + 1}</td>
                    <td>{business.dti_number || '-'}</td>
                    <td>{business.business_name || '-'}</td>
                    <td>{business.step1Data?.street || '-'}</td>
                    <td>{business.owner_name || '-'}</td>
                    <td>{business.typeOfApplication || '-'}</td>
                    <td>{business.taxYear || '-'}</td>
                    <td>{new Date(business.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="select-btn"
                        onClick={() => handleSelectBusiness(business)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
