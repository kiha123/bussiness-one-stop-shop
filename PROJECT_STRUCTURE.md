/**
 * Project Structure Documentation
 * 
 * This document outlines the new, more maintainable project structure
 * organized by feature and responsibility.
 */

## New Project Structure

```
src/
├── components/
│   ├── shared/                      # Shared layout components
│   │   ├── Navbar.jsx              # Global navigation
│   │   ├── Navbar.css
│   │   ├── Footer.jsx              # Global footer
│   │   ├── Footer.css
│   │   ├── ProtectedRoute.jsx       # Auth guard for protected pages
│   │   ├── AdminRoute.jsx           # Auth guard for admin pages
│   │   └── index.js                # Barrel export
│   │
│   ├── common/                      # Reusable UI components
│   │   ├── StatusBadge.jsx          # Status badge component (BPLO)
│   │   ├── MiniChart.jsx            # Mini bar chart component (BPLO)
│   │   └── index.js                # Barrel export
│   │
│   ├── layout/                      # Layout wrapper components (for future use)
│   │   └── MainLayout.jsx
│   │
│   ├── (legacy files remain here temporarily)
│   │   ├── AdminAnalytics.jsx
│   │   ├── BPLOAdmin.jsx
│   │   ├── BPLOPages.jsx
│   │   ├── BPLOStyles.js
│   │   └── ... (other legacy components)
│   
├── pages/
│   ├── public/                      # Public-facing pages
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   ├── Requirements.jsx
│   │   ├── Announcements.jsx
│   │   ├── NewRegistration.jsx
│   │   ├── Tracking.jsx
│   │   ├── Verification.jsx
│   │   ├── FeeComputation.jsx
│   │   ├── Appointment.jsx
│   │   ├── BusinessOperation.jsx
│   │   ├── LineOfBusiness.jsx
│   │   ├── Retirement.jsx
│   │   ├── Summary.jsx
│   │   └── index.js                # Barrel export
│   │
│   ├── auth/                        # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   └── index.js                # Barrel export
│   │
│   ├── admin/                       # Admin-only pages
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminDashboard.css
│   │   ├── AdminApprovals.jsx       # (future expansions)
│   │   └── index.js                # Barrel export
│   │
│   └── bplo/                        # Business Permits & Licensing Office
│       ├── BPLOAdmin.jsx            # Admin role application
│       ├── BPLOTreasurer.jsx        # Treasurer role application
│       ├── BPLOEndorsement.jsx      # Endorsement officer role application
│       └── index.js                # Barrel export
│
├── modules/
│   ├── admin/                       # Admin-specific business logic
│   │   ├── hooks/                  # Custom hooks  
│   │   └── utils/                  # Admin utilities
│   │
│   └── bplo/                        # BPLO-specific business logic
│       ├── styles.js               # Centralized BPLO styles (1200+ lines)
│       ├── pages.js                # All BPLO page components (1400+ lines)
│       ├── data.js                 # Mock data/constants
│       ├── hooks/                  # BPLO custom hooks
│       ├── utils/                  # BPLO utilities
│       ├── services/               # API/data services
│       └── index.js                # Barrel export
│
├── routes/
│   ├── routeConfig.js              # Centralized route definitions
│   └── ProtectedRoutes.jsx          # Route protection logic wrappers
│
├── styles/
│   ├── global.css                  # Global styles
│   ├── variables.css               # CSS custom properties
│   ├── typography.css              # Font definitions
│   └── reset.css                   # CSS reset
│
├── contexts/
│   └── AuthContext.jsx             # Authentication state (existing)
│
├── lib/
│   └── supabase.js                 # Supabase client (existing)
│
├── utils/
│   └── index.js                    # Helper functions (existing)
│
├── assets/
│   └── ...                         # Images, fonts, etc.
│
├── App.jsx                         # Root application component (UPDATED)
├── App.css                         # Root styles
├── main.jsx                        # Entry point
└── index.css                       # Root CSS
```

## Migration Status

### Completed
✅ Created `/components/shared` with:
   - Navbar.jsx with updated imports
   - Footer.jsx with updated imports
   - ProtectedRoute.jsx with updated imports
   - AdminRoute.jsx with updated imports
   - Navbar.css & Footer.css

✅ Created `/components/common` with:
   - StatusBadge.jsx (BPLO shared component)
   - MiniChart.jsx (BPLO shared component)

✅ Created `/pages/public` (directory)
✅ Created `/pages/auth` (directory)
✅ Created `/pages/admin` (directory)
✅ Created `/pages/bplo` (directory)

✅ Created `/modules/bplo` with:
   - styles.js (BPLO styling)
   - Placeholder for pages.js

✅ Created `/routes` with:
   - routeConfig.js (centralized route definitions)

✅ Updated `App.jsx` with new import structure

### Pending (Manual Steps)

1. **Move page files to `/pages/public/`:**
   - Copy Home.jsx, About.jsx, Services.jsx, etc. from `/pages` to `/pages/public/`
   - Copy their corresponding .css files
   - Update any internal imports

2. **Move auth files to `/pages/auth/`:**
   - Move Login.jsx and Login.css to `/pages/auth/`

3. **Move admin files to `/pages/admin/`:**
   - Move AdminDashboard.jsx and AdminDashboard.css to `/pages/admin/`

4. **Create `/pages/bplo/` files:**
   - Create BPLOAdmin.jsx with updated imports
   - Create BPLOTreasurer.jsx with updated imports
   - Create BPLOEndorsement.jsx with updated imports

5. **Create `/modules/bplo/pages.js`:**
   - Extract all page exports from BPLOPages.jsx

6. **Create `/modules/bplo/data.js`:**
   - Extract mock data (APPLICATIONS, BUSINESSES, etc.)

7. **Create additional style files in `/styles/`:**
   - Add global.css, variables.css, typography.css

## Breaking Changes (Updated in App.jsx)

### Import Changes
```javascript
// OLD
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import Home from './pages/Home';

// NEW
import { Navbar, Footer, ProtectedRoute, AdminRoute } from './components/shared';
import { Home } from './pages/public';
// or
import Home from './pages/public/Home';
```

## Import Patterns

### For Shared Components
```javascript
import { Navbar, Footer, ProtectedRoute, AdminRoute } from '@/components/shared';
// or with full path
import { Navbar } from './components/shared';
```

### For Common Components
```javascript
import { StatusBadge, MiniChart } from '@/components/common';
// or with full path
import { StatusBadge } from './components/common';
```

### For Page Components
```javascript
import { Home, About, Services } from '@/pages/public';
// or with full path
import Home from './pages/public/Home';
```

### For BPLO Modules
```javascript
import { BPLOStyles, Dashboard, Applications } from '@/modules/bplo';
// or with full path
import { BPLOStyles } from './modules/bplo/styles';
import { Dashboard } from './modules/bplo/pages';
```

### For Routes
```javascript
import { PUBLIC_ROUTES, AUTH_ROUTES, ADMIN_ROUTES } from '@/routes/routeConfig';
// or with full path
import * as routes from './routes/routeConfig';
```

## Benefits of This Structure

1. **Better Organization**: Similar features are grouped together
2. **Scalability**: Easy to add new features by creating new directories
3. **Maintainability**: Clear separation of concerns
4. **Discoverability**: Easy to find components and pages
5. **Import Clarity**: Index files make imports more convenient
6. **Testing**: Easier to mock and test isolated modules
7. **Performance**: Potential for code splitting and lazy loading
8. **Documentation**: Self-documenting folder structure

## Path Aliases (Optional but Recommended)

Configure `vite.config.js` to support path aliases:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Then use:
```javascript
import { Navbar } from '@/components/shared';
import Home from '@/pages/public/Home';
```

## Next Steps

1. Run migrations for pending items listed above
2. Test the application thoroughly
3. Update any component-specific documentation
4. Consider implementing code splitting for BPLO pages
5. Add unit tests for new structure
