import { useState } from 'react';
import { Settings, Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    appName: 'San Carlos eBOSS',
    appSubtitle: 'Electronic Business One-Stop Shop',
    city: 'San Carlos City',
    province: 'Pangasinan',
    contactEmail: 'bplo@sancarloscity.gov.ph',
    contactPhone: '(075) 123-4567',
    applicationDeadline: '30',
    permitValidityYears: '1',
    renewalDays: '30'
  });

  const [businessCategories, setBusinessCategories] = useState([
    { id: 1, name: 'Retail Trade' },
    { id: 2, name: 'Wholesale Trade' },
    { id: 3, name: 'Manufacturing' },
    { id: 4, name: 'Service' },
    { id: 5, name: 'Food and Beverage' }
  ]);

  const [feeRules, setFeeRules] = useState([
    { id: 1, category: 'Retail Trade', baseFee: '5000', processingFee: '500' },
    { id: 2, category: 'Wholesale Trade', baseFee: '10000', processingFee: '1000' },
    { id: 3, category: 'Manufacturing', baseFee: '15000', processingFee: '1500' }
  ]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newFeeRule, setNewFeeRule] = useState({ category: '', baseFee: '', processingFee: '' });

  const handleSettingsChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    setBusinessCategories([
      ...businessCategories,
      { id: Math.max(...businessCategories.map(c => c.id)) + 1, name: newCategory }
    ]);
    setNewCategory('');
    setShowCategoryForm(false);
    toast.success('Business category added');
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Delete this category?')) {
      setBusinessCategories(businessCategories.filter(c => c.id !== id));
      toast.success('Category deleted');
    }
  };

  const handleAddFeeRule = () => {
    if (!newFeeRule.category || !newFeeRule.baseFee || !newFeeRule.processingFee) {
      toast.error('Please fill all fee rule fields');
      return;
    }
    setFeeRules([
      ...feeRules,
      { 
        id: Math.max(...feeRules.map(f => f.id), 0) + 1, 
        ...newFeeRule 
      }
    ]);
    setNewFeeRule({ category: '', baseFee: '', processingFee: '' });
    setShowFeeForm(false);
    toast.success('Fee rule added');
  };

  const handleDeleteFeeRule = (id) => {
    if (window.confirm('Delete this fee rule?')) {
      setFeeRules(feeRules.filter(f => f.id !== id));
      toast.success('Fee rule deleted');
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>System Settings</h2>
        <p>Configure application settings and rules</p>
      </div>

      {/* System Settings */}
      <div className="settings-card">
        <h3>System Configuration</h3>
        <div className="settings-form">
          <div className="form-row">
            <div className="form-group">
              <label>Application Name</label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => handleSettingsChange('appName', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={settings.appSubtitle}
                onChange={(e) => handleSettingsChange('appSubtitle', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleSettingsChange('city', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Province</label>
              <input
                type="text"
                value={settings.province}
                onChange={(e) => handleSettingsChange('province', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingsChange('contactEmail', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleSettingsChange('contactPhone', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Application Deadline (days)</label>
              <input
                type="number"
                value={settings.applicationDeadline}
                onChange={(e) => handleSettingsChange('applicationDeadline', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Permit Validity (years)</label>
              <input
                type="number"
                value={settings.permitValidityYears}
                onChange={(e) => handleSettingsChange('permitValidityYears', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Renewal Notice (days)</label>
              <input
                type="number"
                value={settings.renewalDays}
                onChange={(e) => handleSettingsChange('renewalDays', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <button className="btn-primary" onClick={handleSaveSettings}>
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>

      {/* Business Categories */}
      <div className="settings-card">
        <div className="card-header-with-button">
          <h3>Business Categories</h3>
          <button className="btn-secondary" onClick={() => setShowCategoryForm(true)}>
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {showCategoryForm && (
          <div className="form-section">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="button-group">
              <button className="btn-primary" onClick={handleAddCategory}>Add</button>
              <button className="btn-secondary" onClick={() => setShowCategoryForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="categories-list">
          {businessCategories.map(category => (
            <div key={category.id} className="category-item">
              <span>{category.name}</span>
              <button
                className="btn-icon danger"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Computation Rules */}
      <div className="settings-card">
        <div className="card-header-with-button">
          <h3>Fee Computation Rules</h3>
          <button className="btn-secondary" onClick={() => setShowFeeForm(true)}>
            <Plus size={18} />
            Add Fee Rule
          </button>
        </div>

        {showFeeForm && (
          <div className="form-section">
            <div className="form-group">
              <label>Category</label>
              <select
                value={newFeeRule.category}
                onChange={(e) => setNewFeeRule({...newFeeRule, category: e.target.value})}
                className="form-control"
              >
                <option value="">Select category</option>
                {businessCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Base Fee (₱)</label>
                <input
                  type="number"
                  value={newFeeRule.baseFee}
                  onChange={(e) => setNewFeeRule({...newFeeRule, baseFee: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Processing Fee (₱)</label>
                <input
                  type="number"
                  value={newFeeRule.processingFee}
                  onChange={(e) => setNewFeeRule({...newFeeRule, processingFee: e.target.value})}
                  className="form-control"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn-primary" onClick={handleAddFeeRule}>Add Fee Rule</button>
              <button className="btn-secondary" onClick={() => setShowFeeForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Base Fee</th>
                <th>Processing Fee</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feeRules.map(rule => (
                <tr key={rule.id}>
                  <td>{rule.category}</td>
                  <td>₱{parseInt(rule.baseFee).toLocaleString()}</td>
                  <td>₱{parseInt(rule.processingFee).toLocaleString()}</td>
                  <td>₱{(parseInt(rule.baseFee) + parseInt(rule.processingFee)).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-icon danger"
                      onClick={() => handleDeleteFeeRule(rule.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
