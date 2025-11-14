@echo off
REM EventFlow Calendar - Quick Setup Script (Windows)
REM Run this after downloading the project to your local machine

echo 🚀 EventFlow Calendar - Quick Setup
echo ====================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found
    echo Please run this script from the eventflow-calendar directory
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Installation failed. Please check your Node.js installation.
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo.
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open your browser to:
echo    http://localhost:3000
echo.
echo 3. Initialize Git (if not done):
echo    git init
echo    git add .
echo    git commit -m "Initial commit: EventFlow Calendar v1.0"
echo.
echo 4. Create GitHub repository and push:
echo    git remote add origin https://github.com/YOUR-USERNAME/eventflow-calendar.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 5. Deploy to Netlify:
echo    npm run build
echo    netlify deploy --prod
echo.
echo 🎉 Happy coding!
echo.
pause
