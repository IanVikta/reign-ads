@echo off
echo ========================================
echo    REIGN ADS - Network Server Startup
echo ========================================
echo.
echo Your servers will be accessible at:
echo - Backend:  http://192.168.1.8:8000
echo - Frontend: http://192.168.1.8:5173
echo - Admin:    http://192.168.1.8:5173/admin/dashboard
echo.
echo Starting servers...
echo.

REM Start backend server in new window
start "Laravel Backend" cmd /k "cd backend && php artisan serve --host=0.0.0.0 --port=8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server in new window
start "React Frontend" cmd /k "cd frontend && npm run dev -- --host 0.0.0.0"

echo.
echo Both servers are starting in separate windows...
echo.
echo To access from other devices on your network:
echo - Website: http://192.168.1.8:5173
echo - Admin Dashboard: http://192.168.1.8:5173/admin/dashboard
echo.
echo Press any key to exit this window...
pause > nul