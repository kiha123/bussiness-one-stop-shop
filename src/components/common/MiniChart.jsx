/**
 * MiniChart Component
 * Lightweight bar chart for displaying data trends
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MiniChart({ data, color = "navy" }) {
  const max = Math.max(...data);
  
  return (
    <div className="chart-bar-wrap">
      {data.map((value, index) => (
        <div key={index} className="chart-bar-col">
          <div
            className={`chart-bar ${color}`}
            style={{ height: `${(value / max) * 100}%` }}
            title={`${MONTHS[index]}: ${value}`}
          />
          <span className="chart-label">{MONTHS[index]}</span>
        </div>
      ))}
    </div>
  );
}
