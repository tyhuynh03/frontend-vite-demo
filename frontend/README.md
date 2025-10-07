# Frontend - MOOC Học Vụ Số

React + Vite + TypeScript + TailwindCSS

## 🚀 Setup

### Yêu cầu
- Node.js 18+ (Download: https://nodejs.org/)

### Cài đặt

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend chạy tại: http://localhost:5173

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Build production
npm run preview  # Preview build
npm run lint     # Lint code
```

## 🔗 Kết nối Backend

API URL mặc định: `http://localhost:8000/api/auth`

Để thay đổi, tạo file `.env`:
```env
VITE_API_URL=http://localhost:8000/api/auth
```

## 📁 Cấu trúc

```
src/
├── components/      # React components
│   ├── Login.tsx
│   └── Register.tsx
├── services/       # API services
│   └── api.ts      # Axios instance & API calls
├── types/          # TypeScript types
│   └── user.ts
├── utils/          # Utilities
│   └── auth.ts     # Auth helpers
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập
2. Backend trả về JWT tokens (access + refresh)
3. Frontend lưu tokens vào localStorage
4. Mọi API call tự động thêm Bearer token vào header
5. Token hết hạn → auto refresh token

## 🎨 UI Components

- **Login.tsx** - Đăng nhập form
- **Register.tsx** - Đăng ký form
- Modern design với TailwindCSS
- Responsive mobile-first
- Loading states
- Error handling

## 📦 Dependencies

```json
{
  "dependencies": {
    "axios": "^1.6.2",           // HTTP client
    "react": "^19.1.1",          // UI library
    "react-dom": "^19.1.1",      // React DOM
    "react-router-dom": "^7.9.3" // Routing
  }
}
```

## ⚠️ Lỗi TypeScript

Nếu thấy lỗi TypeScript trong IDE:
```bash
# Cài đặt lại dependencies
npm install

# Hoặc clear cache
rm -rf node_modules package-lock.json
npm install
```

## 🧪 Test API Connection

```javascript
// Test trong browser console
fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123456'
  })
})
.then(r => r.json())
.then(console.log)
```

## 🔧 Development

### Hot Module Replacement (HMR)
Vite tự động reload khi code thay đổi

### TypeScript
Type checking tự động trong IDE

### ESLint
```bash
npm run lint
```

## 📚 Learn More

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Axios Docs](https://axios-http.com/)




