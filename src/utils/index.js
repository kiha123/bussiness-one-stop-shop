import { v4 as uuidv4 } from 'uuid';

/**
 * Map an email address to the application's role labels.
 */
export function getUserRoleFromEmail(email) {
  if (!email) return 'User';

  const normalizedEmail = email.toLowerCase();

  if (normalizedEmail === 'admin@boss.com') return 'Super Admin';
  if (normalizedEmail === 'staff@bplo.gov.ph') return 'BPLO Staff';
  if (normalizedEmail === 'treasurer@payment.gov.ph') return 'Treasurer';
  if (normalizedEmail === 'endorsing@sanitary.gov.ph') return 'Endorsing Office';

  if (normalizedEmail.includes('admin')) {
    return 'Super Admin';
  } else if (normalizedEmail.includes('bplo') || normalizedEmail.includes('staff')) {
    return 'BPLO Staff';
  } else if (normalizedEmail.includes('treasurer') || normalizedEmail.includes('payment')) {
    return 'Treasurer';
  } else if (
    normalizedEmail.includes('endorsing') ||
    normalizedEmail.includes('sanitary') ||
    normalizedEmail.includes('fire') ||
    normalizedEmail.includes('building')
  ) {
    return 'Endorsing Office';
  }

  return 'User';
}

/**
 * Generates a tracking code in format: BIZ-YYYY-XXXXX
 */
export function generateBusinessTrackingCode() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');
  return `BIZ-${year}-${random}`;
}

/**
 * Generates a renewal tracking code in format: REN-YYYY-XXXXX
 */
export function generateRenewalTrackingCode() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');
  return `REN-${year}-${random}`;
}

/**
 * Fee computation based on business type and capitalization
 */
export function computeFees(businessType, capitalization) {
  const cap = parseFloat(capitalization) || 0;

  // Base fees by business type
  const feeStructure = {
    retail: { mayor: 3000, sanitary: 2000, fire: 1500 },
    wholesale: { mayor: 5000, sanitary: 2500, fire: 2000 },
    services: { mayor: 2500, sanitary: 1500, fire: 1000 },
    manufacturing: { mayor: 7000, sanitary: 3000, fire: 2500 },
    food: { mayor: 4000, sanitary: 3500, fire: 2000 },
    trading: { mayor: 3500, sanitary: 2000, fire: 1500 },
    professional: { mayor: 2000, sanitary: 500, fire: 500 },
  };

  const baseFee = feeStructure[businessType] || feeStructure.services;

  // Compute surcharge based on capitalization
  let capitalTax = 0;
  if (cap > 100000) {
    capitalTax = (cap - 100000) * 0.02; // 2% over 100k
  }

  const mayorFee = baseFee.mayor + capitalTax;
  const sanitaryFee = baseFee.sanitary;
  const fireFee = baseFee.fire;
  const total = mayorFee + sanitaryFee + fireFee;

  return {
    mayorPermitFee: mayorFee,
    sanitaryFee: sanitaryFee,
    fireInspectionFee: fireFee,
    totalFee: total,
    capitalTax: capitalTax,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Philippine phone number
 */
export function isValidPhoneNumber(phone) {
  const phoneRegex = /^(\+63|0)?[9][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Get business type label
 */
export function getBusinessTypeLabel(type) {
  const labels = {
    retail: 'Retail',
    wholesale: 'Wholesale',
    services: 'Services',
    manufacturing: 'Manufacturing',
    food: 'Food & Beverage',
    trading: 'Trading',
    professional: 'Professional Services',
  };
  return labels[type] || type;
}

/**
 * Get application status label with color
 */
export function getStatusBadge(status) {
  const badges = {
    'Submitted': {
      label: 'Submitted',
      color: 'bg-blue-500',
      textColor: 'text-blue-900',
    },
    'pending-review': {
      label: 'Pending Review',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-900',
    },
    'under-review': {
      label: 'Under Review',
      color: 'bg-blue-500',
      textColor: 'text-blue-900',
    },
    'for-payment': {
      label: 'For Payment',
      color: 'bg-orange-500',
      textColor: 'text-orange-900',
    },
    approved: {
      label: 'Approved',
      color: 'bg-green-500',
      textColor: 'text-green-900',
    },
    released: {
      label: 'Released',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-900',
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-red-500',
      textColor: 'text-red-900',
    },
  };
  return badges[status] || badges['pending-review'];
}

/**
 * Get progress steps for application
 */
export function getProgressSteps(status) {
  const stepsMap = {
    'Submitted': 1,
    'pending-review': 1,
    'under-review': 2,
    'for-payment': 3,
    approved: 4,
    released: 5,
  };
  return stepsMap[status] || 0;
}
