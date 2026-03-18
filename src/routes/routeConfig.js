/**
 * Route configuration for the application
 * Centralized route definitions for better maintainability
 */

// Public pages
export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  ANNOUNCEMENTS: '/announcements',
  CONTACT: '/contact',
  REQUIREMENTS: '/requirements',
};

// Auth routes
export const AUTH_ROUTES = {
  LOGIN: '/auth',
};

// Admin dashboard routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
};

// Service routes (protected)
export const SERVICE_ROUTES = {
  NEW_REGISTRATION: '/services/new-registration',
  BUSINESS_OPERATION: '/BusinessOperation',
  LINE_OF_BUSINESS: '/LineOfBusiness',
  SUMMARY: '/Summary',
  RETIREMENT: '/services/retirement',
  TRACKING: '/services/tracking',
  VERIFICATION: '/services/verification',
  FEE_COMPUTATION: '/services/fee-computation',
  APPOINTMENT: '/services/appointment',
};

// All routes
export const ALL_ROUTES = {
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...ADMIN_ROUTES,
  ...SERVICE_ROUTES,
};
