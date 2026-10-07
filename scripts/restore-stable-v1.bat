@echo off
echo ========================================================
echo Restoring repository to 'working-stable-v1' checkpoint...
echo ========================================================
git reset --hard working-stable-v1
git clean -fd
echo.
echo [SUCCESS] Repository has been restored to 'working-stable-v1'.
echo Run 'hugo server -D' to start development.
pause
