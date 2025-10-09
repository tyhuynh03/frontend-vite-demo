# 🚀 Hướng Dẫn Chạy Project

## 📋 Yêu Cầu

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+
- Excel files để import dữ liệu khóa học (optional)

## ⚡ Quick Start

### 1. Clone & Setup PostgreSQL

```bash
# Tạo database
& "đường dẫn chứa psql.exe" -U postgres
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

# Import dữ liệu khóa học từ Excel
python import_courses_excel.py
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

1. **Trang chủ**: Mở http://localhost:5173
   - Trang chủ, Tin tức, Khóa học, Chương trình học, Giảng viên

2. **Authentication**:
   - Click "Đăng ký ngay"
   - Điền form:
     - Họ tên: Test User
     - Email: test@example.com
     - Password: test123456
   - Click "Đăng ký" → Redirect về trang chủ ✅
   - Test login với email/password vừa tạo

3. **Khóa học**:
   - Click "Khóa học" trong Navbar
   - Kiểm tra danh sách khóa học với search và filter
   - Click "Chi tiết" trên một khóa học
   - Kiểm tra trang chi tiết với tabs: Giới thiệu, Nội dung khóa học, Giảng viên, Chương trình đào tạo


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

// Get courses
fetch('http://localhost:8000/api/auth/courses/')
  .then(r => r.json()).then(console.log)

// Get course by ID
fetch('http://localhost:8000/api/auth/courses/1/')
  .then(r => r.json()).then(console.log)

// Filter courses by level
fetch('http://localhost:8000/api/auth/courses/?level=THCS')
  .then(r => r.json()).then(console.log)
```

## 🔍 Kiểm Tra

### Database
```bash
psql -U postgres -d mooc_db

# Check users table
SELECT * FROM users;

# Check courses table
SELECT * FROM courses;

# Check course categories
SELECT DISTINCT category FROM courses;

# Check course levels
SELECT DISTINCT level FROM courses;
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

### Authentication
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/register/` | No | Đăng ký |
| POST | `/api/auth/login/` | No | Đăng nhập |
| POST | `/api/auth/logout/` | Yes | Đăng xuất |
| GET | `/api/auth/profile/` | Yes | Lấy thông tin user |
| POST | `/api/auth/token/refresh/` | No | Refresh token |

### Course Management
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | `/api/auth/courses/` | No | Danh sách khóa học |
| POST | `/api/auth/courses/` | Yes | Tạo khóa học mới |
| GET | `/api/auth/courses/{id}/` | No | Chi tiết khóa học |
| PUT | `/api/auth/courses/{id}/` | Yes | Cập nhật khóa học |
| DELETE | `/api/auth/courses/{id}/` | Yes | Xóa khóa học |

### Course Filtering
- `?level={level}` - Lọc theo cấp độ
- `?category={category}` - Lọc theo chuyên mục

## 🗄️ Database Schema

### User Model
- `id` - Primary Key
- `username` - Unique
- `email` - Unique (dùng để login)
- `password` - Hashed
- `role` - student/teacher/admin
- `created_at`, `updated_at` - Timestamps

### Course Model
- `id` - Primary Key
- `title` - Tên khóa học
- `level` - Cấp độ (free-form text)
- `category` - Chuyên mục
- `description` - Mô tả khóa học
- `content` - Nội dung chi tiết
- `is_active` - Trạng thái (soft delete)
- `created_at`, `updated_at` - Timestamps

## 📝 Lưu Ý

- Password được hash tự động bằng Django
- JWT tokens: Access (1h), Refresh (7d)
- CORS đã config cho localhost:5173
- Database mặc định: PostgreSQL
- Course deletion là soft delete (is_active = False)
- Excel import script hỗ trợ mapping level values
- Frontend routing: `/courses` cho danh sách, `/courses/:id` cho chi tiết

## 🎯 Tech Stack

**Backend:**
- Django 4.2
- Django REST Framework
- JWT Authentication (SimpleJWT)
- PostgreSQL
- OpenPyXL (Excel import/export)
- CORS Headers

**Frontend:**
- React 19
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM

