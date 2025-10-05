# 🤝 Hướng dẫn Contribute cho Team

Tài liệu này hướng dẫn quy trình đơn giản KHÔNG dùng branch (pull → commit → push). Khi team sẵn sàng, có thể chuyển sang quy trình dùng branch/PR sau.

## 📋 Quy trình nhanh (không dùng branch)

### 🔄 Trước khi bắt đầu làm việc
```bash
# Kiểm tra trạng thái
git status

# Lấy code mới nhất từ remote
git pull origin main
```

### 💻 Trong khi làm việc
```bash
# Xem thay đổi
git status

# Thêm file thay đổi
git add .
# hoặc thêm file cụ thể
git add path/to/file

# Commit với message rõ ràng
git commit -m "Mo ta ngan gon thay doi"
```

### ⬆️ Đẩy code lên GitHub
```bash
git push origin main
```

### ❗ Nếu push bị từ chối (rejected)
Nguyên nhân thường do có người đã đẩy code mới trước bạn. Cách xử lý an toàn là rebase:
```bash
git pull --rebase origin main
# Nếu có conflict: mở file sửa conflict, sau đó
git add .
git rebase --continue

# Đẩy lại
git push origin main
```

## ✅ Quy tắc quan trọng
1. Luôn chạy `git pull` trước khi bắt đầu làm việc
2. Commit message ngắn gọn, rõ ràng về mục đích thay đổi
3. Test nhanh trước khi `git push`
4. Tránh chỉnh cùng một file với người khác cùng thời điểm (trao đổi trong team trước)

Gợi ý (tùy chọn, khi team sẵn sàng): chuyển sang quy trình có branch và Pull Request để review chất lượng tốt hơn.

## 🛠️ Cách chạy dự án

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## 📝 Mẫu commit message
```
feat: thêm tính năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: thay đổi định dạng/mã hoá
refactor: chỉnh sửa cấu trúc mã (không đổi hành vi)
test: thêm/cập nhật kiểm thử
chore: cập nhật cấu hình, dependency
```

Ví dụ:
- feat: add user login functionality
- fix: resolve header layout issue
- docs: update API documentation

## 🆘 Khi gặp vấn đề

### Conflict khi rebase/merge
```bash
# Lấy code mới
git pull --rebase origin main
# Sửa conflict trong editor, sau đó
git add .
git rebase --continue
```

### Muốn hủy thay đổi cục bộ
```bash
# Hủy thay đổi 1 file chưa commit
git checkout -- path/to/file

# Hủy toàn bộ thay đổi chưa commit
git reset --hard HEAD
```

## 📞 Liên hệ
- Tạo issue trên GitHub nếu có vấn đề
- Ping team lead trên chat khi cần hỗ trợ nhanh
