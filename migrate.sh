#!/bin/bash
# Migration script for reorganizing React project structure
# Usage: ./migrate.sh

set -e  # Exit on error

echo "🔄 Starting project structure migration..."

PROJECT_ROOT="$(dirname "$0")/boss_project/src"

# Ensure target directories exist
mkdir -p "$PROJECT_ROOT/pages/public"
mkdir -p "$PROJECT_ROOT/pages/auth"
mkdir -p "$PROJECT_ROOT/pages/admin"
mkdir -p "$PROJECT_ROOT/pages/bplo"
mkdir -p "$PROJECT_ROOT/modules/bplo"
mkdir -p "$PROJECT_ROOT/styles"

echo "📦 Step 1/5: Moving public pages..."
# Public pages
pages=(
  "Home.jsx" "Home.css"
  "About.jsx" "About.css"
  "Services.jsx" "Services.css"
  "Contact.jsx" "Contact.css"
  "Requirements.jsx" "Requirements.css"
  "Announcements.jsx" "Announcements.css"
  "NewRegistration.jsx" "NewRegistration.css"
  "Tracking.jsx"
  "Verification.jsx"
  "FeeComputation.jsx"
  "Appointment.jsx"
  "BusinessOperation.jsx"
  "LineOfBusiness.jsx"
  "Retirement.jsx"
  "Summary.jsx"
)

for page in "${pages[@]}"; do
  if [ -f "$PROJECT_ROOT/pages/$page" ]; then
    mv "$PROJECT_ROOT/pages/$page" "$PROJECT_ROOT/pages/public/$page"
    echo "  ✓ Moved $page"
  fi
done

echo "📦 Step 2/5: Moving auth pages..."
# Auth pages
auth_pages=("Login.jsx" "Login.css")

for page in "${auth_pages[@]}"; do
  if [ -f "$PROJECT_ROOT/pages/$page" ]; then
    mv "$PROJECT_ROOT/pages/$page" "$PROJECT_ROOT/pages/auth/$page"
    echo "  ✓ Moved $page"
  fi
done

echo "📦 Step 3/5: Moving admin pages..."
# Admin pages  
admin_pages=("AdminDashboard.jsx" "AdminDashboard.css")

for page in "${admin_pages[@]}"; do
  if [ -f "$PROJECT_ROOT/pages/$page" ]; then
    mv "$PROJECT_ROOT/pages/$page" "$PROJECT_ROOT/pages/admin/$page"
    echo "  ✓ Moved $page"
  fi
done

echo "📦 Step 4/5: Moving BPLO components..."
# BPLO pages (from components to pages/bplo)
bplo_pages=("BPLOAdmin.jsx" "BPLOTreasurer.jsx" "BPLOEndorsement.jsx")

for page in "${bplo_pages[@]}"; do
  if [ -f "$PROJECT_ROOT/components/$page" ]; then
    mv "$PROJECT_ROOT/components/$page" "$PROJECT_ROOT/pages/bplo/$page"
    echo "  ✓ Moved $page"
  fi
done

echo "📦 Step 5/5: Organizing BPLO modules..."
# Move BPLO module files
if [ -f "$PROJECT_ROOT/components/BPLOStyles.js" ]; then
  mv "$PROJECT_ROOT/components/BPLOStyles.js" "$PROJECT_ROOT/modules/bplo/styles.js"
  echo "  ✓ Moved BPLOStyles.js"
fi

if [ -f "$PROJECT_ROOT/components/BPLOPages.jsx" ]; then
  mv "$PROJECT_ROOT/components/BPLOPages.jsx" "$PROJECT_ROOT/modules/bplo/pages.js"
  echo "  ✓ Moved BPLOPages.jsx"
fi

echo ""
echo "✅ Migration complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update imports in moved files"
echo "  2. Update imports in App.jsx (already done)"
echo "  3. Run 'npm run dev' to verify no import errors"
echo "  4. Remove legacy files from /src/components when confirmed"
echo ""
