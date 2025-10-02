# MOOC Học vụ số — React + TypeScript + Vite + Tailwind CSS

Hướng dẫn để người khác clone/cài/chạy dự án này.

## Yêu cầu
- Node.js LTS (khuyên dùng 18+ hoặc 20+)
  - Tải và cài đặt: [Node.js LTS](https://nodejs.org/en)
  - Kiểm tra đã cài (PowerShell):
    ```powershell
    node -v
    npm -v
    ```

## Cài đặt và chạy
```bash
git clone <URL_REPO>
cd frontend-vite-demo
npm install
npm run dev
```
Mở trình duyệt tới `http://localhost:5173`.

## Chạy trên mạng LAN (tuỳ chọn)
```bash
npm run dev -- --host 0.0.0.0 --port 5173
```
Sau đó truy cập từ thiết bị khác: `http://IP_MAY_CHU:5173` (ví dụ `http://192.168.1.23:5173`). Nếu cổng bận, đổi `--port`.

## Build production
```bash
npm run build
npm run preview
```
Xem bản build tại `http://localhost:4173`.

## Cấu trúc chính
- `src/App.tsx`: giao diện trang chủ (Navbar, Hero, CourseGrid, Footer).
- `src/index.css`: import Tailwind CSS.
- `tailwind.config.js` + `postcss.config.js`: cấu hình Tailwind/PostCSS v4.

## Ghi chú bản quyền ảnh
Ảnh minh hoạ dùng từ Unsplash (free). Có thể thay bằng ảnh nội bộ đặt trong `public/` và sửa URL trong `src/App.tsx`.
