/**
 * StatusBadge Component
 * Used across BPLO pages to display status indicators
 */

export function StatusBadge({ status }) {
  const statusMap = {
    "Pending": "badge-pending",
    "Processing": "badge-processing",
    "Approved": "badge-approved",
    "Rejected": "badge-rejected",
    "Payment Verified": "badge-approved",
    "Payment Submitted": "badge-processing",
    "Waiting for Payment": "badge-pending",
    "Current": "badge-approved",
    "Due Soon": "badge-pending",
    "Expired": "badge-expired",
    "Reviewing": "badge-processing",
  };

  return <span className={`badge ${statusMap[status] || "badge-pending"}`}>{status}</span>;
}
