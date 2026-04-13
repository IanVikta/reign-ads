@echo off
echo Configuring Windows Firewall for Network Access...
echo.
echo This will allow incoming connections on ports 8000 and 5173
echo You may need to run this as Administrator
echo.

REM Add firewall rules for Laravel backend (port 8000)
netsh advfirewall firewall add rule name="Laravel Backend - Port 8000" dir=in action=allow protocol=TCP localport=8000

REM Add firewall rules for React frontend (port 5173)
netsh advfirewall firewall add rule name="React Frontend - Port 5173" dir=in action=allow protocol=TCP localport=5173

echo.
echo Firewall rules added successfully!
echo.
echo Your servers should now be accessible from other devices on your network:
echo - Backend API: http://192.168.1.8:8000
echo - Frontend: http://192.168.1.8:5173
echo.
pause