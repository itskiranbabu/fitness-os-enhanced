@echo off
TITLE BusinessOS.ai Server
CLS

ECHO ========================================================
ECHO    Starting BusinessOS.ai...
ECHO ========================================================
ECHO.

:: 1. Navigate to project root
CD /D "%~dp0"

:: 2. Check Node version
ECHO Checking Node.js version...
node -v
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Node.js is not installed or not in your PATH.
    PAUSE
    EXIT /B
)

:: 3. Check node_modules
IF NOT EXIST "node_modules" (
    ECHO [INFO] node_modules not found. Installing dependencies...
    call npm install
    IF %ERRORLEVEL% NEQ 0 (
        ECHO [ERROR] formatting npm install failed.
        PAUSE
        EXIT /B
    )
)

:: 4. Clean Next.js cache (optional, helps with lock issues)
IF EXIST ".next\dev\lock" (
    ECHO [INFO] Cleaning up previous session locks...
    DEL /F /Q ".next\dev\lock"
)

ECHO.
ECHO [INFO] Opening browser...
start "" "http://localhost:3000"

ECHO.
ECHO [INFO] Starting Server...
ECHO [INFO] Press Ctrl+C to stop the server.
ECHO.

:: 5. Start Server
call npm run dev

ECHO.
ECHO [WARN] Server stopped unexpectedly.
PAUSE
