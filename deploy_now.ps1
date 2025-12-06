# BusinessOS V2 - Automated Deployment Script
$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   🚀 BusinessOS V2 Deployment Sequence   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Git Push
Write-Host "`n[1/2] Syncing to GitHub..." -ForegroundColor Yellow
try {
    git remote add origin https://github.com/itskiranbabu/fitness-os-enhanced.git 2>$null
}
catch {
    # Ignore if remote exists
}

git push -u origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Git Push failed. Please check your GitHub credentials." -ForegroundColor Red
}
else {
    Write-Host "✅ GitHub Sync Complete." -ForegroundColor Green
}

# 2. Vercel Deploy
Write-Host "`n[2/2] Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "Note: If asked to login, please follow the browser prompt." -ForegroundColor Gray

# Use npx to ensure latest version
npx vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Deployment failed. Try running 'vercel login' first." -ForegroundColor Red
}
else {
    Write-Host "`n✅ VERIFIED: BusinessOS is Live!" -ForegroundColor Green
}

Read-Host "`nPress Enter to exit"
