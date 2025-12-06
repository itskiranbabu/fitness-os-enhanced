Write-Host "🚀 Starting BusinessOS.ai..." -ForegroundColor Cyan

# Check if node_modules exists, if not install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "🌐 Starting Next.js server..." -ForegroundColor Green
Write-Host "👉 The app will open at http://localhost:3000" -ForegroundColor Gray

# Start the browser after a short delay
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"
} | Out-Null

# Run the dev server
npm run dev
