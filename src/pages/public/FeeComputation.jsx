import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, X } from 'lucide-react';
import { computeFees, formatCurrency, getBusinessTypeLabel } from '../../utils';
import './Services.css';

const BUSINESS_TYPES = ['retail', 'wholesale', 'services', 'manufacturing', 'food', 'trading', 'professional'];

export default function FeeComputation() {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState('retail');
  const [capitalization, setCapitalization] = useState('');
  const [fees, setFees] = useState(null);

  const handleCompute = () => {
    if (!capitalization || parseFloat(capitalization) < 0) {
      return;
    }
    const computed = computeFees(businessType, capitalization);
    setFees(computed);
  };

  const handleCapitalizationChange = (e) => {
    const value = e.target.value;
    setCapitalization(value);
    if (value && parseFloat(value) >= 0) {
      const computed = computeFees(businessType, value);
      setFees(computed);
    }
  };

  const handleBusinessTypeChange = (e) => {
    const type = e.target.value;
    setBusinessType(type);
    if (capitalization && parseFloat(capitalization) >= 0) {
      const computed = computeFees(type, capitalization);
      setFees(computed);
    }
  };

  return (
    <div className="service-page">
      <div className="section-container">
        <div className="service-header">
          <div>
            <h1>Fee Computation Calculator</h1>
            <p>Calculate the exact fees for your business based on type and capitalization.</p>
          </div>
          <button 
            className="btn-close"
            onClick={() => navigate('/services')}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="fee-calculator">
          <div className="calc-inputs">
            <div className="form-group">
              <label htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                value={businessType}
                onChange={handleBusinessTypeChange}
                className="form-select"
              >
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type}>
                    {getBusinessTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capitalization">Capitalization Amount (PHP)</label>
              <div className="input-with-icon">
                <span className="currency-symbol">₱</span>
                <input
                  type="number"
                  id="capitalization"
                  value={capitalization}
                  onChange={handleCapitalizationChange}
                  placeholder="Enter capitalization amount"
                  min="0"
                  step="1000"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {fees && (
            <div className="calc-results">
              <div className="fee-breakdown">
                <div className="fee-row">
                  <span className="fee-label">Mayor's Permit Fee:</span>
                  <span className="fee-amount">{formatCurrency(fees.mayorPermitFee)}</span>
                </div>
                <div className="fee-row">
                  <span className="fee-label">Sanitary License Fee:</span>
                  <span className="fee-amount">{formatCurrency(fees.sanitaryFee)}</span>
                </div>
                <div className="fee-row">
                  <span className="fee-label">Fire Inspection Fee:</span>
                  <span className="fee-amount">{formatCurrency(fees.fireInspectionFee)}</span>
                </div>
                {fees.capitalTax > 0 && (
                  <div className="fee-row">
                    <span className="fee-label">Capital Surcharge (2%):</span>
                    <span className="fee-amount">{formatCurrency(fees.capitalTax)}</span>
                  </div>
                )}
              </div>

              <div className="fee-total">
                <span className="total-label">Total Fee:</span>
                <span className="total-amount">{formatCurrency(fees.totalFee)}</span>
              </div>

              <div className="fee-note">
                <p>This calculation is for reference only. Actual fees may vary based on additional requirements and local policies.</p>
              </div>
            </div>
          )}

          {!fees && capitalization && (
            <div className="no-results">
              <Calculator size={40} />
              <p>Enter capital amount and select business type to calculate fees</p>
            </div>
          )}
        </div>

        {/* Fee Guidelines */}
        <div className="fee-guidelines">
          <h3>Fee Structure by Business Type</h3>
          <div className="guidelines-grid">
            {BUSINESS_TYPES.map(type => {
              const baseFees = computeFees(type, 0);
              return (
                <div key={type} className="guideline-card">
                  <h4>{getBusinessTypeLabel(type)}</h4>
                  <div className="guideline-items">
                    <div className="guideline-item">
                      <span>Mayor's Permit:</span>
                      <strong>{formatCurrency(baseFees.mayorPermitFee)}</strong>
                    </div>
                    <div className="guideline-item">
                      <span>Sanitary:</span>
                      <strong>{formatCurrency(baseFees.sanitaryFee)}</strong>
                    </div>
                    <div className="guideline-item">
                      <span>Fire:</span>
                      <strong>{formatCurrency(baseFees.fireInspectionFee)}</strong>
                    </div>
                    <div className="guideline-total">
                      <span>Base Total:</span>
                      <strong>{formatCurrency(baseFees.mayorPermitFee + baseFees.sanitaryFee + baseFees.fireInspectionFee)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
