# 🚀 Hướng Dẫn Chạy Project

## 📋 Yêu Cầu

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

## ⚡ Quick Start

### 1. Clone & Setup PostgreSQL

```bash
# Tạo database
psql -U postgres
CREATE DATABASE mooc_db;
\q
```

### 2. Backend Setup

```bash
cd backend

# Tạo virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac

# Cài dependencies
pip install -r requirements.txt

# Tạo file .env
echo SECRET_KEY=django-insecure-dev > .env
echo DEBUG=True >> .env
echo DATABASE_ENGINE=postgresql >> .env
echo DATABASE_NAME=mooc_db >> .env
echo DATABASE_USER=postgres >> .env
echo DATABASE_PASSWORD=YOUR_PASSWORD >> .env
echo DATABASE_HOST=localhost >> .env
echo DATABASE_PORT=5432 >> .env
echo FRONTEND_URL=http://localhost:5173 >> .env

# ⚠️ Sửa YOUR_PASSWORD trong file .env

# Chạy migrations (QUAN TRỌNG: Đúng thứ tự)
python manage.py makemigrations 
python manage.py migrate

# Tạo superuser (optional)
python manage.py createsuperuser

# Chạy server
python manage.py runserver
```

✅ Backend: http://localhost:8000

### 3. Frontend Setup (Terminal mới)

```bash
cd frontend

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

✅ Frontend: http://localhost:5173

## 🧪 Test

### Test trên Website

1. Mở http://localhost:5173
2. Click "Đăng ký ngay"
3. Điền form:
   - Họ tên: Test User
   - Email: test@example.com
   - Password: test123456
4. Click "Đăng ký" → Redirect về trang chủ ✅
5. Test login với email/password vừa tạo


### Test trong Browser Console (F12)

```javascript
// Register
fetch('http://localhost:8000/api/auth/register/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    username: 'John',
    email: 'john@test.com',
    password: 'test123456',
    confirm_password: 'test123456'
  })
}).then(r => r.json()).then(console.log)

// Login
fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'john@test.com',
    password: 'test123456'
  })
}).then(r => r.json()).then(console.log)
```

## 🔍 Kiểm Tra

### Database
```bash
psql -U postgres -d mooc_db
SELECT * FROM users;
```

### Django Admin
- URL: http://localhost:8000/admin/
- Login bằng superuser đã tạo

### localStorage (Browser F12 → Console)
```javascript
console.log(localStorage.getItem('user'))
console.log(localStorage.getItem('access_token'))
```

## 🐛 Troubleshooting

### Lỗi: relation "users" does not exist

```bash
# Xóa database và tạo lại
psql -U postgres
DROP DATABASE mooc_db;
CREATE DATABASE mooc_db;
\q

# Chạy lại migrations đúng thứ tự
python manage.py makemigrations 
python manage.py migrate
```

### Lỗi: Cannot find module 'react'

```bash
cd frontend
npm install
```

### Lỗi: CORS

Kiểm tra `backend/config/settings.py`:
```python
CORS_ALLOWED_ORIGINS = ['http://localhost:5173']
```

### Lỗi: Port đã được sử dụng

```bash
# Backend - port 8000
python manage.py runserver 8001

# Frontend - Vite tự động dùng port khác (5174, 5175...)
```

## 📚 API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/register/` | No | Đăng ký |
| POST | `/api/auth/login/` | No | Đăng nhập |
| POST | `/api/auth/logout/` | Yes | Đăng xuất |
| GET | `/api/auth/profile/` | Yes | Lấy thông tin user |
| POST | `/api/auth/token/refresh/` | No | Refresh token |

## 🗄️ Database Schema

### User Model
- `id` - Primary Key
- `username` - Unique
- `email` - Unique (dùng để login)
- `password` - Hashed
- `role` - student/teacher/admin
- `created_at`, `updated_at` - Timestamps

## 📝 Lưu Ý

- Password được hash tự động bằng Django
- JWT tokens: Access (1h), Refresh (7d)
- CORS đã config cho localhost:5173
- Database mặc định: PostgreSQL (có thể dùng SQLite bằng cách set `DATABASE_ENGINE=sqlite` trong .env)

## 🎯 Tech Stack

**Backend:**
- Django 4.2
- Django REST Framework
- JWT Authentication
- PostgreSQL

**Frontend:**
- React 19
- TypeScript
- Vite
- TailwindCSS
- Axios

