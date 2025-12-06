@echo off
echo ==========================================
echo    🚀 Starting BusinessOS.ai...
echo ==========================================

:: Switch to the script's directory
cd /d "%~dp0"

:: Check for node_modules
if not exist node_modules (
    echo 📦 Installing dependencies (this may take a minute)...
    call npm install
)

echo.
echo 🌐 Opening browser to http://localhost:3000...
start http://localhost:3000

echo.
echo ⚡ Starting Next.js development server...
echo    (Press Ctrl+C to stop)
echo.

call npm run dev

pause
