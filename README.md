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
- Course Search & Filtering
- Course Detail Pages với Tab Navigation (7 tabs chi tiết)
- Markdown Import cho dữ liệu khóa học
- Role-based Course Creation (Teachers can create courses)

### 🎨 User Interface
- Modern Responsive UI với TailwindCSS
- Course Grid Layout
- Tab Navigation (Giới thiệu, Yêu cầu đầu vào, Mục tiêu, Nội dung, Bài tập, Tiến độ, Lưu ý)
- Search Functionality
- Loading States & Error Handling

### 🔧 Backend Features
- RESTful API với Django REST Framework
- PostgreSQL Database
- Markdown Data Import với content cleaning
- Admin Panel
- CORS Configuration
- Role-based Permissions

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations 
python manage.py migrate
python create_admin_user.py
python import_markdown_courses.py
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
│   ├── core/            # User & Course models
│   ├── khoa_hoc/        # Markdown course files
│   ├── import_markdown_courses.py
│   ├── create_admin_user.py
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
- `?search={keyword}` - Tìm kiếm theo từ khóa (title, introduction, content)

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
- `introduction` - Giới thiệu sơ lược
- `requirements` - Yêu cầu đầu vào
- `objectives` - Mục tiêu khóa học
- `content` - Nội dung khóa học
- `exercises` - Bài tập
- `progress_schedule` - Tiến độ đề xuất
- `notes` - Lưu ý, ghi chú
- `created_by` - Người tạo (ForeignKey to User, nullable)
- `is_active` - Trạng thái (soft delete)
- `created_at`, `updated_at` - Timestamps

## Scripts

**Backend:**
```bash
python manage.py runserver              # Start server
python manage.py makemigrations         # Create migrations
python manage.py migrate                # Run migrations
python manage.py createsuperuser        # Create superuser
python create_admin_user.py             # Create admin user
python import_markdown_courses.py       # Import courses from markdown
python clear_courses_data.py            # Clear course data
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

# Search courses by keyword
curl -X GET "http://localhost:8000/api/auth/courses/?search=AI"
```

## 📝 Markdown Import

### Cấu trúc file Markdown
Các file khóa học trong thư mục `backend/khoa_hoc/` phải có cấu trúc:

```markdown
# Tên khóa học

## 1. Giới thiệu sơ lược
Nội dung giới thiệu...

## 2. Yêu cầu đầu vào
Yêu cầu cần thiết...

## 3. Mục tiêu khóa học
Mục tiêu học tập...

## 4. Nội dung khóa học
Nội dung chi tiết...

## 5. Bài tập
Các bài tập thực hành...

## 6. Tiến độ đề xuất
Lịch trình học tập...

## 7. Lưu ý, ghi chú
Các lưu ý quan trọng...
```

### Content Cleaning
Script import tự động làm sạch:
- ✅ Bỏ định dạng **bold**, *italic*
- ✅ Bỏ links, headers, list markers
- ✅ Bỏ emoji và icon
- ✅ Giữ nguyên dấu tiếng Việt
- ✅ Làm sạch khoảng trắng thừa

### Import Commands
```bash
# Tạo admin user (nếu chưa có)
python create_admin_user.py

# Import tất cả khóa học từ markdown
python import_markdown_courses.py

# Xóa dữ liệu khóa học (nếu cần)
python clear_courses_data.py
```

## License

MIT
