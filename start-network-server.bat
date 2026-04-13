@echo off
echo Starting Laravel Backend Server on Network...
echo.
echo Your backend will be accessible at:
echo - Local: http://localhost:8000
echo - Network: http://192.168.1.8:8000
echo.
echo Press Ctrl+C to stop the server
echo.
cd backend
php artisan serve --host=0.0.0.0 --port=8000
pause