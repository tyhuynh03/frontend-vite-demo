# MOOC Học Vụ Số - Full Stack Application

Dự án học tập trực tuyến với cấu trúc monorepo gồm frontend và backend.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, TailwindCSS, Axios, React Router  
**Backend:** Django 4.2, DRF, JWT (simplejwt), PostgreSQL, CORS, OpenPyXL

## Tính năng

### 🔐 Authentication & Authorization
- User Authentication (Register, Login, Logout)
- JWT Token Authentication
- Role-based Access (Student, Teacher, Admin)
- Protected Routes & API Endpoints

### 📚 Course Management
- CRUD Operations cho khóa học
- Course Categories & Levels
- Course Search & Filtering
- Course Detail Pages với Tab Navigation
- Excel Import/Export cho dữ liệu khóa học

### 🎨 User Interface
- Modern Responsive UI với TailwindCSS
- Course Grid Layout
- Tab Navigation (Giới thiệu, Nội dung, Giảng viên, Chương trình)
- Breadcrumb Navigation
- Loading States & Error Handling

### 🔧 Backend Features
- RESTful API với Django REST Framework
- PostgreSQL Database
- Excel Data Import (OpenPyXL)
- Admin Panel
- CORS Configuration

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations 
python manage.py migrate
python import_courses_excel.py
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Chi tiết:** [guide_run.md](./guide_run.md)

## Cấu trúc

```
frontend-vite-demo/
├── backend/
│   ├── config/          # Django settings
│   ├── core/        # User app
│   └── manage.py
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── services/    # API services
│       ├── types/       # TypeScript types
│       └── utils/       # Auth utilities
└── guide_run.md
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register/` | Đăng ký | No |
| POST | `/api/auth/login/` | Đăng nhập | No |
| POST | `/api/auth/logout/` | Đăng xuất | Yes |
| GET | `/api/auth/profile/` | Thông tin user | Yes |
| PATCH | `/api/auth/profile/` | Cập nhật user | Yes |
| POST | `/api/auth/token/refresh/` | Refresh token | No |

### Course Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/auth/courses/` | Danh sách khóa học | No |
| POST | `/api/auth/courses/` | Tạo khóa học mới | Yes |
| GET | `/api/auth/courses/{id}/` | Chi tiết khóa học | No |
| PUT | `/api/auth/courses/{id}/` | Cập nhật khóa học | Yes |
| DELETE | `/api/auth/courses/{id}/` | Xóa khóa học (soft delete) | Yes |

### Query Parameters cho Course List
- `?level={level}` - Lọc theo cấp độ
- `?category={category}` - Lọc theo chuyên mục

## Database Schema

### User Model
- `id` - Primary Key
- `username` - Unique username
- `email` - Unique email (login field)
- `password` - Hashed password
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

## Scripts

**Backend:**
```bash
python manage.py runserver              # Start server
python manage.py makemigrations         # Create migrations
python manage.py migrate                # Run migrations
python manage.py createsuperuser        # Create admin user
python import_courses_excel.py          # Import courses from Excel
```

**Frontend:**
```bash
npm run dev       # Development server
npm run build     # Build production
npm run preview   # Preview build
npm run lint      # Lint code
```

## Test API

### Authentication
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123456","confirm_password":"test123456"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123456"}'
```

### Course Management
```bash
# Get all courses
curl -X GET http://localhost:8000/api/auth/courses/

# Get course by ID
curl -X GET http://localhost:8000/api/auth/courses/1/

# Filter courses by level
curl -X GET http://localhost:8000/api/auth/courses/?level=THCS

# Filter courses by category
curl -X GET http://localhost:8000/api/auth/courses/?category=Sáng+tạo+nội+dung
```

## License

MIT
