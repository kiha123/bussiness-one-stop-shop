$SrcPath = "$(Get-Location)\src"

Write-Host "`n🔄 Starting migration..." -ForegroundColor Cyan

# Create directories
if (-not (Test-Path "$SrcPath\pages\public")) { New-Item -ItemType Directory "$SrcPath\pages\public" -Force }
if (-not (Test-Path "$SrcPath\pages\auth")) { New-Item -ItemType Directory "$SrcPath\pages\auth" -Force }  
if (-not (Test-Path "$SrcPath\pages\admin")) { New-Item -ItemType Directory "$SrcPath\pages\admin" -Force }
if (-not (Test-Path "$SrcPath\pages\bplo")) { New-Item -ItemType Directory "$SrcPath\pages\bplo" -Force }
if (-not (Test-Path "$SrcPath\modules\bplo")) { New-Item -ItemType Directory "$SrcPath\modules\bplo" -Force }
if (-not (Test-Path "$SrcPath\styles")) { New-Item -ItemType Directory "$SrcPath\styles" -Force }
Write-Host "✓ Directories created`n" -ForegroundColor Green

# Move public pages
Write-Host "📦 Moving public pages..." -ForegroundColor Yellow
Move-Item "$SrcPath\pages\*.jsx" "$SrcPath\pages\public\" -Force -ErrorAction SilentlyContinue
Move-Item "$SrcPath\pages\*.css" "$SrcPath\pages\public\" -Force -ErrorAction SilentlyContinue
Write-Host "  ✓ Public pages moved" -ForegroundColor Green

# Move auth pages (they got moved above, so recreate if needed)
Write-Host "`n📦 Moving auth pages..." -ForegroundColor Yellow
if (Test-Path "$SrcPath\pages\public\Login.jsx") { Move-Item "$SrcPath\pages\public\Login.jsx" "$SrcPath\pages\auth\Login.jsx" -Force }
if (Test-Path "$SrcPath\pages\public\Login.css") { Move-Item "$SrcPath\pages\public\Login.css" "$SrcPath\pages\auth\Login.css" -Force }
Write-Host "  ✓ Auth pages moved" -ForegroundColor Green

# Move admin pages
Write-Host "`n📦 Moving admin pages..." -ForegroundColor Yellow
if (Test-Path "$SrcPath\pages\public\AdminDashboard.jsx") { Move-Item "$SrcPath\pages\public\AdminDashboard.jsx" "$SrcPath\pages\admin\AdminDashboard.jsx" -Force }
if (Test-Path "$SrcPath\pages\public\AdminDashboard.css") { Move-Item "$SrcPath\pages\public\AdminDashboard.css" "$SrcPath\pages\admin\AdminDashboard.css" -Force }
Write-Host "  ✓ Admin pages moved" -ForegroundColor Green

# Move BPLO components
Write-Host "`n📦 Moving BPLO components..." -ForegroundColor Yellow
if (Test-Path "$SrcPath\components\BPLOAdmin.jsx") { Move-Item "$SrcPath\components\BPLOAdmin.jsx" "$SrcPath\pages\bplo\BPLOAdmin.jsx" -Force -ErrorAction SilentlyContinue }
if (Test-Path "$SrcPath\components\BPLOTreasurer.jsx") { Move-Item "$SrcPath\components\BPLOTreasurer.jsx" "$SrcPath\pages\bplo\BPLOTreasurer.jsx" -Force -ErrorAction SilentlyContinue }
if (Test-Path "$SrcPath\components\BPLOEndorsement.jsx") { Move-Item "$SrcPath\components\BPLOEndorsement.jsx" "$SrcPath\pages\bplo\BPLOEndorsement.jsx" -Force -ErrorAction SilentlyContinue }
Write-Host "  ✓ BPLO components moved" -ForegroundColor Green

# Move BPLO modules
Write-Host "`n📦 Moving BPLO modules..." -ForegroundColor Yellow
if (Test-Path "$SrcPath\components\BPLOStyles.js") { Move-Item "$SrcPath\components\BPLOStyles.js" "$SrcPath\modules\bplo\styles.js" -Force -ErrorAction SilentlyContinue }
if (Test-Path "$SrcPath\components\BPLOPages.jsx") { Move-Item "$SrcPath\components\BPLOPages.jsx" "$SrcPath\modules\bplo\pages.js" -Force -ErrorAction SilentlyContinue }
Write-Host "  ✓ BPLO modules moved" -ForegroundColor Green

Write-Host "`n✅ Migration complete!" -ForegroundColor Green
Write-Host "📝 Next: Run 'npm run dev' to verify imports`n" -ForegroundColor Yellow
