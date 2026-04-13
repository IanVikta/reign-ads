@echo off
echo Starting React Frontend Server on Network...
echo.
echo Your frontend will be accessible at:
echo - Local: http://localhost:5173
echo - Network: http://192.168.1.8:5173
echo.
echo Press Ctrl+C to stop the server
echo.
cd frontend
npm run dev -- --host 0.0.0.0
pause