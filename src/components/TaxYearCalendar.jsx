import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import './TaxYearCalendar.css';

export default function TaxYearCalendar({ value, onChange, error }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const currentYear = new Date().getFullYear();
  const [calendarYear, setCalendarYear] = useState(currentYear);
  const startYear = 2020;
  const endYear = 2030;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const handleYearSelect = (year) => {
    onChange({ target: { name: 'taxYear', value: year.toString() } });
    setShowCalendar(false);
  };

  const handlePrevYear = () => {
    setCalendarYear(prev => Math.max(prev - 1, startYear));
  };

  const handleNextYear = () => {
    setCalendarYear(prev => Math.min(prev + 1, endYear));
  };

  return (
    <div className="tax-year-calendar-wrapper">
      <div className="tax-year-input-container">
        <div className="tax-year-input"
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            border: error ? '2px solid #dc2626' : '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            fontSize: '14px'
          }}
        >
          <Calendar size={16} style={{ color: '#666' }} />
          <span style={{ color: value ? '#000' : '#999' }}>
            {value || 'Select Tax Year'}
          </span>
        </div>
      </div>

      {error && <span className="error-msg">{error}</span>}

      {showCalendar && (
        <div className="tax-year-calendar-dropdown">
          <div className="calendar-header">
            <button onClick={handlePrevYear} className="nav-btn">
              <ChevronLeft size={18} />
            </button>
            <span className="year-range">{calendarYear}</span>
            <button onClick={handleNextYear} className="nav-btn">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-grid">
            {years.map(year => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`year-btn ${value === year.toString() ? 'selected' : ''} ${year === calendarYear ? 'highlighted' : ''}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
