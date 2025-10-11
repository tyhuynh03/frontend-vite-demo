import { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserMenu from './components/UserMenu';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!(token && user));
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">MOOC Học vụ số</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link to="/" className="hover:text-slate-900">Trang chủ</Link>
          <a className="hover:text-slate-900" href="#tin-tuc">Tin tức</a>
          <Link to="/courses" className="hover:text-slate-900">Khóa học</Link>
          <a className="hover:text-slate-900" href="#giang-vien">Giảng viên</a>
        </nav>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Đăng nhập</Link>
              <Link to="/register" className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <section className="border-b bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Nền tảng Học vụ số cho kỷ nguyên AI</h1>
          <p className="mt-4 text-slate-600 md:text-lg">Khóa học chất lượng được cập nhật thường xuyên. Bắt đầu học ngay hôm nay.</p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/courses" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">Khám phá khóa học</Link>
          </div>
          
          {/* Search Section */}
          <div className="mt-8">
            <p className="text-lg font-medium text-slate-700 mb-3">Hãy tìm kiếm khóa học bạn quan tâm:</p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto w-full max-w-xl md:max-w-2xl">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"
              alt="AI & giáo dục"
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Dữ liệu khóa học demo đã được loại bỏ

// CourseGrid đã được loại bỏ khỏi trang chủ theo yêu cầu

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} MOOC Học vụ số</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900">Điều khoản</a>
            <a href="#" className="hover:text-slate-900">Bảo mật</a>
            <a href="#" className="hover:text-slate-900">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/edit" element={<EditCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App
