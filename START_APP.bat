@echo off
echo Campus Diaries - Starting...
echo.

if not exist ".env" (
    echo JWT_SECRET=campus_diaries_super_secret_key_12345678_change_in_production > .env
    echo MONGO_URI=mongodb://127.0.0.1:27017/campus_diaries >> .env
    echo PORT=8080 >> .env
    echo NODE_ENV=development >> .env
    echo .env file created
)

net start MongoDB 2>nul
start "Backend" cmd /k "npm start"
timeout /t 3 /nobreak > nul
cd client
start "Frontend" cmd /k "npm run dev"
cd ..
timeout /t 5 /nobreak > nul
start http://localhost:5173

echo.
echo App started! Keep terminal windows open.
pause
