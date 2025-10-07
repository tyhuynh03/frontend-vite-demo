# MOOC Học Vụ Số - Full Stack Application

Dự án học tập trực tuyến với cấu trúc monorepo gồm frontend và backend.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, TailwindCSS, Axios, React Router  
**Backend:** Django 4.2, DRF, JWT (simplejwt), PostgreSQL/MySQL/SQLite, CORS

## Tính năng

- User Authentication (Register, Login, Logout)
- JWT Token Authentication
- Role-based Access (Student, Teacher, Admin)
- RESTful API & Admin Panel
- Modern Responsive UI

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations 
python manage.py migrate
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
│   ├── accounts/        # User app
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

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register/` | Đăng ký | No |
| POST | `/api/auth/login/` | Đăng nhập | No |
| POST | `/api/auth/logout/` | Đăng xuất | Yes |
| GET | `/api/auth/profile/` | Thông tin user | Yes |
| PATCH | `/api/auth/profile/` | Cập nhật user | Yes |
| POST | `/api/auth/token/refresh/` | Refresh token | No |

## Database Schema - User Model

- `id` - Primary Key
- `username` - Unique username
- `email` - Unique email (login field)
- `password` - Hashed password
- `role` - student/teacher/admin
- `created_at`, `updated_at` - Timestamps

## Scripts

**Backend:**
```bash
python manage.py runserver    # Start server
python manage.py migrate       # Run migrations
python setup_db.py            # Setup database
```

**Frontend:**
```bash
npm run dev       # Development server
npm run build     # Build production
npm run preview   # Preview build
npm run lint      # Lint code
```

## Test API

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

## License

MIT
