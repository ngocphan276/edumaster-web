@echo off
chcp 65001 >nul
echo =======================================================
echo          ĐĂNG NHẬP GITHUB CLI ĐỂ ĐẨY CODE LÊN
echo =======================================================
echo Khi đuợc hỏi "What account do you want to log into?", hãy chọn GitHub.com
echo Khi đuợc hỏi "What is your preferred protocol for Git operations?", chọn HTTPS
echo Khi đuợc hỏi "Authenticate Git with your GitHub credentials?", chọn Yes
echo Khi đuợc hỏi "How would you like to authenticate GitHub CLI?", chọn Login with a web browser
echo.
echo Nhấn Enter một lần nữa để mở trình duyệt, copy mã 8 chữ số màn hình cung cấp và dán vào đó nhé!
echo -------------------------------------------------------

"C:\Program Files\GitHub CLI\gh.exe" auth login

echo.
echo =======================================================
echo Đang tạo Repo mới trên tài khoản GitHub của bạn và tự động đẩy mã nguồn...
echo =======================================================
"C:\Program Files\GitHub CLI\gh.exe" repo create edumaster-web --public --source=. --remote=origin --push
echo.
echo TẤT CẢ ĐÃ XONG! Mã nguồn đã được tải lên kho lưu trữ 'edumaster-web' trên GitHub của bạn.
pause
