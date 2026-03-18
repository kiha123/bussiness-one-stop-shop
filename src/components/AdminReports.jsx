import { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminReports() {
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportsData] = useState([
    {
      id: 1,
      name: 'Daily Applications Report',
      date: new Date().toLocaleDateString(),
      applications: 12,
      approvals: 8,
      rejections: 2
    },
    {
      id: 2,
      name: 'Monthly Business Registrations',
      date: new Date().toLocaleDateString(),
      registrations: 145,
      renewals: 32,
      retirements: 5
    },
    {
      id: 3,
      name: 'Revenue Collection Report',
      date: new Date().toLocaleDateString(),
      amount: '₱245,000',
      payments: 49,
      pending: 8
    }
  ]);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      toast.error('Please select date range');
      return;
    }
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated`);
  };

  const handleExport = (format, reportName) => {
    toast.success(`${reportName} exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Reports & Analytics</h2>
        <p>Generate and export system reports</p>
      </div>

      {/* Report Generator */}
      <div className="report-generator">
        <div className="generator-card">
          <h3>Generate Report</h3>
          
          <div className="form-group">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-control"
            >
              <option value="daily">Daily Applications Report</option>
              <option value="monthly">Monthly Business Registrations</option>
              <option value="revenue">Revenue Collection Report</option>
              <option value="custom">Custom Report</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <button className="btn-primary" onClick={handleGenerateReport}>
            <FileText size={18} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="recent-reports">
        <h3>Recent Reports</h3>
        <div className="reports-list">
          {reportsData.map(report => (
            <div key={report.id} className="report-item">
              <div className="report-icon">
                <FileText size={24} />
              </div>
              <div className="report-details">
                <h4>{report.name}</h4>
                <p className="report-date">Generated: {report.date}</p>
                {report.applications && (
                  <p className="report-stats">
                    Applications: {report.applications} | Approvals: {report.approvals} | Rejections: {report.rejections}
                  </p>
                )}
                {report.registrations && (
                  <p className="report-stats">
                    Registrations: {report.registrations} | Renewals: {report.renewals} | Retirements: {report.retirements}
                  </p>
                )}
                {report.amount && (
                  <p className="report-stats">
                    Total: {report.amount} | Payments: {report.payments} | Pending: {report.pending}
                  </p>
                )}
              </div>
              <div className="report-actions">
                <button 
                  className="btn-icon"
                  title="Download PDF"
                  onClick={() => handleExport('pdf', report.name)}
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="export-section">
        <h3>Quick Export</h3>
        <div className="export-buttons">
          <button className="btn-secondary" onClick={() => handleExport('pdf', 'Report')}>
            Export as PDF
          </button>
          <button className="btn-secondary" onClick={() => handleExport('excel', 'Report')}>
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
}
