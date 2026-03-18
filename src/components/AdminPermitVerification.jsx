import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import '../styles/AdminComponents.css';

export default function AdminPermitVerification() {
  const [searchType, setSearchType] = useState('permit-number');
  const [searchValue, setSearchValue] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    // Mock verification data
    const mockResult = {
      permitNumber: 'PRM-2026-00145',
      businessName: 'Juan\'s Hardware Store',
      ownerName: 'Juan Santos',
      businessType: 'Retail Trade',
      address: '123 Main Street, San Carlos City',
      issueDate: '2026-01-15',
      expiryDate: '2027-01-15',
      status: 'valid',
      permitHolder: true
    };

    setVerificationResult(mockResult);
  };

  const handleQRScan = () => {
    // In a real app, this would integrate with a QR code scanner
    setSearchValue('PRM-2026-00145');
    handleSearch();
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Permit Verification</h2>
        <p>Verify business permit authenticity and validity</p>
      </div>

      {/* Verification Tool */}
      <div className="verification-tool">
        <div className="search-card">
          <h3>Search Permit</h3>
          
          <div className="form-group">
            <label>Search By</label>
            <div className="search-type-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="searchType"
                  value="permit-number"
                  checked={searchType === 'permit-number'}
                  onChange={(e) => setSearchType(e.target.value)}
                />
                <span>Permit Number</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="searchType"
                  value="business-name"
                  checked={searchType === 'business-name'}
                  onChange={(e) => setSearchType(e.target.value)}
                />
                <span>Business Name</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="searchType"
                  value="qr-code"
                  checked={searchType === 'qr-code'}
                  onChange={(e) => setSearchType(e.target.value)}
                />
                <span>QR Code Scan</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="search-input-group">
              <input
                type="text"
                placeholder={`Enter ${searchType === 'permit-number' ? 'permit number' : 'business name'}...`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="form-control"
              />
              <button className="btn-primary" onClick={handleSearch}>
                <Search size={18} />
                Search
              </button>
              {searchType === 'qr-code' && (
                <button className="btn-secondary" onClick={handleQRScan}>
                  <QrCode size={18} />
                  Scan QR
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className={`verification-result ${verificationResult.status === 'valid' ? 'valid' : 'invalid'}`}>
          <div className="result-header">
            <div className="result-icon">
              {verificationResult.status === 'valid' ? (
                <CheckCircle size={32} className="success-icon" />
              ) : (
                <AlertCircle size={32} className="danger-icon" />
              )}
            </div>
            <div className="result-title">
              <h3>Permit Status: {verificationResult.status === 'valid' ? 'VALID' : 'INVALID'}</h3>
              <p>The permit has been verified in our system</p>
            </div>
          </div>

          <div className="result-details">
            <div className="detail-grid">
              <div className="detail-item">
                <label>Permit Number</label>
                <p>{verificationResult.permitNumber}</p>
              </div>
              <div className="detail-item">
                <label>Business Name</label>
                <p>{verificationResult.businessName}</p>
              </div>
              <div className="detail-item">
                <label>Permit Holder</label>
                <p>{verificationResult.ownerName}</p>
              </div>
              <div className="detail-item">
                <label>Business Type</label>
                <p>{verificationResult.businessType}</p>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <p>{verificationResult.address}</p>
              </div>
              <div className="detail-item">
                <label>Issue Date</label>
                <p>{new Date(verificationResult.issueDate).toLocaleDateString()}</p>
              </div>
              <div className="detail-item">
                <label>Expiry Date</label>
                <p>{new Date(verificationResult.expiryDate).toLocaleDateString()}</p>
              </div>
              <div className="detail-item">
                <label>Verification Status</label>
                <p>
                  <span className={`badge ${verificationResult.status === 'valid' ? 'badge-success' : 'badge-danger'}`}>
                    {verificationResult.status === 'valid' ? 'AUTHENTIC' : 'NOT FOUND'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="result-footer">
            <p className="verification-note">
              {verificationResult.status === 'valid'
                ? 'This permit is valid and authentic. The business is licensed to operate.'
                : 'This permit could not be verified. Please contact the BPLO for more information.'}
            </p>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="help-section">
        <h3>How to Verify a Permit</h3>
        <ol className="help-steps">
          <li>
            <strong>Use Permit Number:</strong> Enter the permit number from the certificate (format: PRM-YYYY-XXXXX)
          </li>
          <li>
            <strong>Use Business Name:</strong> Enter the full registered business name as it appears in records
          </li>
          <li>
            <strong>Scan QR Code:</strong> Use a QR code scanner to read the permit certificate's QR code
          </li>
          <li>
            <strong>Review Results:</strong> Check if the permit is valid and has not expired
          </li>
        </ol>
      </div>
    </div>
  );
}
