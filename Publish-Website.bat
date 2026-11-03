@echo off
setlocal
cd /d "%~dp0"
for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if not "%CURRENT_BRANCH%"=="main" (
    echo [ERROR] Switch to main before publishing.
    goto :failed
)
for /f "delims=" %%S in ('git status --porcelain') do (
    echo [ERROR] Commit or set aside local changes before publishing.
    goto :failed
)
echo Saving website source to your personal GitHub...
git push origin main
if errorlevel 1 goto :failed
echo Updating the official website publishing repository...
git push publishing main
if errorlevel 1 goto :failed
echo [SUCCESS] Both repositories updated. GitHub Pages will rebuild the website.
if /i not "%~1"=="--unattended" pause
exit /b 0
:failed
echo [FAILED] Publishing did not complete. Review the error above.
if /i not "%~1"=="--unattended" pause
exit /b 1
