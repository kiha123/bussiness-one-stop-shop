# Import Fixes Guide

After the migration, you may encounter import errors in some files. This guide helps you fix them systematically.

## Step 1: Run the development server and note errors

```bash
npm run dev
```

Take note of any "Module not found" errors. They will show the file path and missing import.

## Step 2: Common import patterns to fix

### Pattern 1: Page files importing other pages
**Old path:**
```javascript
import Home from './Home'
import About from './About'
```

**New path (when in `/pages/public/`):**
```javascript
import Home from './Home'  // Same folder, no change needed
import About from './About'  // Same folder, no change needed
```

### Pattern 2: BPLO components importing from components
**Old path (in `/components/BPLOAdmin.jsx`):**
```javascript
import StatusBadge from './StatusBadge'
import MiniChart from './MiniChart'
import styles from './BPLOStyles'
```

**New path (in `/pages/bplo/BPLOAdmin.jsx`):**
```javascript
import StatusBadge from '../../components/common/StatusBadge'
import MiniChart from '../../components/common/MiniChart'
import { BPLOStyles } from '../../modules/bplo'
```

### Pattern 3: Pages importing from utils or lib
**Path remains the same:**
```javascript
// These paths don't change - relative path is the same
import { someUtil } from '../../utils/index'
import { supabase } from '../../lib/supabase'
```

### Pattern 4: Pages importing contexts
**Path remains the same:**
```javascript
import { useAuth } from '../../contexts/AuthContext'
```

### Pattern 5: Components importing assets
**Path remains the same if using proper relative paths:**
```javascript
import logo from '../../assets/logo.png'
```

## Step 3: File-specific fixes

### If error is in `/pages/public/Home.jsx`
Check if Home.jsx imports:
- Other pages? → Update path: `'./About'` stays same (same folder)
- Shared components? → Update: `'../../components/shared/Navbar'`
- Admin pages? → Update: `'../admin/AdminDashboard'`

### If error is in `/pages/bplo/BPLOAdmin.jsx`
Check imports and update:
```javascript
// OLD (when in components/)
import { BPLOStyles } from './BPLOStyles'

// NEW (when in pages/bplo/)
import { BPLOStyles } from '../../modules/bplo/styles'
// OR use barrel export
import { BPLOStyles } from '../../modules/bplo'
```

### If error is in `/modules/bplo/pages.js`
This file contains all BPLO page components. Check imports:
```javascript
// These images/data imports might need fixing
import { APPLICATIONS, BUSINESSES } from './data'  // Create this file!
import StatusBadge from '../../components/common/StatusBadge'
import MiniChart from '../../components/common/MiniChart'
```

## Step 4: Create missing data file

If `modules/bplo/data.js` is imported but doesn't exist, create it:

```javascript
// /src/modules/bplo/data.js

// Extract mock data from pages.js (formerly BPLOPages.jsx) lines 3-60
export const APPLICATIONS = [...]
export const BUSINESSES = [...]
export const PAYMENTS = [...]
export const ANNOUNCEMENTS = [...]
export const PERMIT_DATA = [...]
// ... etc
```

## Step 5: Verify barrel exports

Ensure each feature directory has correct barrel exports:

### `/src/components/shared/index.js` ✅
```javascript
export { default as Navbar } from './Navbar'
export { default as Footer } from './Footer'
export { ProtectedRoute }
export { AdminRoute }
```

### `/src/components/common/index.js` ✅
```javascript
export { default as StatusBadge } from './StatusBadge'
export { default as MiniChart } from './MiniChart'
```

### `/src/pages/public/index.js` ✅
```javascript
export { default as Home } from './Home'
export { default as About } from './About'
// ... all 15 pages
```

### `/src/pages/auth/index.js` ✅
```javascript
export { default as Login } from './Login'
```

### `/src/pages/admin/index.js` ✅
```javascript
export { default as AdminDashboard } from './AdminDashboard'
```

### `/src/pages/bplo/index.js` ✅
```javascript
export { default as BPLOAdmin } from './BPLOAdmin'
export { default as BPLOTreasurer } from './BPLOTreasurer'
export { default as BPLOEndorsement } from './BPLOEndorsement'
```

### `/src/modules/bplo/index.js` ✅
```javascript
export { BPLOStyles } from './styles'
export { default as Dashboard } from './pages'
// ... other page exports from pages.js
```

## Step 6: Update App.jsx if needed

Verify App.jsx has correct imports (should already be done):

```javascript
// Shared components
import { Navbar, Footer, ProtectedRoute, AdminRoute } from './components/shared'

// Public pages
import Home from './pages/public/Home'
import About from './pages/public/About'
// ... all public pages

// Auth pages
import Login from './pages/auth/Login'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'

// BPLO pages (optional - use barrel exports)
import { BPLOAdmin, BPLOTreasurer, BPLOEndorsement } from './pages/bplo'
```

## Step 7: Test each component

After fixing imports, test:

```bash
npm run dev
```

Check browser console for errors. If you still see import errors:

1. Copy the exact error message
2. Find the file mentioned in the error
3. Look for the problematic import line
4. Apply the patterns from this guide

## Common Error Messages and Fixes

### Error: "Cannot find module './Home'" in Home.jsx
- File is trying to import itself. Remove: `import Home from './Home'`

### Error: "Cannot find module '../../components/Button'" in pages/public/Home.jsx
- Button component doesn't exist. Either create it or check the path.
- If it's in `/components/admin/`, path should be: `'../../components/admin/Button'`

### Error: "Cannot find module './styles'" in BPLOAdmin.jsx
- Old path (when in `/components/`): ✓ `'./styles'` worked
- New path (when in `/pages/bplo/`): ✗ `'./styles'` doesn't work
- New path should be: ✓ `'../../modules/bplo/styles'`
- Or use barrel: ✓ `'../../modules/bplo'` if exported there

### Error: "Cannot find module './BPLOPages'"
- BPLOPages.jsx was moved to `/modules/bplo/pages.js`
- Import from: `'../../modules/bplo/pages'`
- Or use barrel: `'../../modules/bplo'` if exported there

## Quick Reference: Path from any file

From `/pages/public/Home.jsx`:
- To shared component: `'../../components/shared/Navbar'`
- To common component: `'../../components/common/StatusBadge'`  
- To BPLO module: `'../../modules/bplo'`
- To sibling page: `'./About'`
- To auth page: `'../auth/Login'`
- To admin page: `'../admin/AdminDashboard'`
- To utils: `'../../utils'`
- To lib: `'../../lib/supabase'`
- To contexts: `'../../contexts/AuthContext'`

From `/pages/bplo/BPLOAdmin.jsx`:
- To shared component: `'../../components/shared/Navbar'`
- To common component: `'../../components/common/StatusBadge'`
- To BPLO styles: `'../../modules/bplo/styles'` or `'../../modules/bplo'`
- To sibling page: `'./BPLOTreasurer'`
- To public page: `'../public/Home'`
- To auth page: `'../auth/Login'`

From `/modules/bplo/pages.js`:
- To common component: `'../../components/common/StatusBadge'`
- To BPLO styles: `'./styles'` (same folder)
- To BPLO data: `'./data'` (same folder - if created)
- To utils: `'../../utils'`

## Need help?

1. **Check the actual error message** - It usually tells you exactly what's wrong
2. **Look at the file structure** - Use this guide to count `../` correctly
3. **Test incrementally** - Fix one import error at a time
4. **Use the barrel exports** - They simplify imports significantly

After fixing all imports, your app should run without module errors! 🎉
