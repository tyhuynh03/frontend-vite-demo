import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">MOOC Học vụ số</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          <a className="hover:text-slate-900" href="#khoa-hoc">Khóa học</a>
          <a className="hover:text-slate-900" href="#lo-trinh">Lộ trình</a>
          <a className="hover:text-slate-900" href="#blog">Blog</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Đăng nhập</Link>
          <Link to="/register" className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500">Đăng ký</Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Nền tảng Học vụ số cho kỷ nguyên AI</h1>
          <p className="mt-4 text-slate-600 md:text-lg">Khóa học chất lượng, lộ trình rõ ràng, theo dõi tiến độ thông minh. Bắt đầu học ngay hôm nay.</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#khoa-hoc" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">Khám phá khóa học</a>
            <a href="#" className="rounded-md border px-4 py-2 text-slate-700 hover:bg-slate-50">Dùng thử miễn phí</a>
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

type Course = { id: string; title: string; level: string; tag: string; image: string };

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Nhập môn Trí tuệ nhân tạo",
    level: "Beginner",
    tag: "AI",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Machine Learning cơ bản",
    level: "Beginner",
    tag: "AI",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Phân tích dữ liệu với Python",
    level: "Beginner",
    tag: "Data",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Frontend Web với React",
    level: "Intermediate",
    tag: "Web",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Thiết kế hệ thống trên Cloud",
    level: "Intermediate",
    tag: "Cloud",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "An toàn thông tin căn bản",
    level: "Beginner",
    tag: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
];

function CourseGrid() {
  return (
    <section id="khoa-hoc" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Khóa học nổi bật</h2>
          <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500" href="#">Xem tất cả</a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-xl border transition hover:shadow-md">
              <div className="h-40 w-full overflow-hidden bg-slate-100">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">{c.tag}</span>
                <span>{c.level}</span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-900">{c.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500">Học ngay</button>
                  <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Chi tiết</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

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
      <CourseGrid />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App
