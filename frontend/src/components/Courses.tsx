import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

interface Course {
  id: number;
  title: string;
  level: string;
  category: string;
  description: string;
  content: string;
  created_at: string;
  is_active: boolean;
}

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
          <a className="hover:text-slate-900" href="#chuong-trinh-hoc">Chương trình học</a>
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

function CourseCard({ course }: { course: Course }) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Sáng tạo nội dung': 'bg-purple-100 text-purple-700',
      'Lập trình': 'bg-blue-100 text-blue-700',
      'Trí tuệ nhân tạo': 'bg-green-100 text-green-700',
      'Phát triển web': 'bg-orange-100 text-orange-700',
      'Phân tích dữ liệu': 'bg-yellow-100 text-yellow-700',
      'Bảo mật': 'bg-red-100 text-red-700',
      'Lập trình game': 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getLevelColor = (level: string) => {
    // Tự động tạo màu dựa trên hash của level
    const hash = level.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const colors = [
      'bg-blue-50 text-blue-600',
      'bg-green-50 text-green-600', 
      'bg-purple-50 text-purple-600',
      'bg-orange-50 text-orange-600',
      'bg-red-50 text-red-600',
      'bg-indigo-50 text-indigo-600',
      'bg-pink-50 text-pink-600',
      'bg-yellow-50 text-yellow-600',
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <article className="overflow-hidden rounded-xl border transition hover:shadow-md bg-white">
      <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        {/* Placeholder cho ảnh khóa học - sẽ được thêm sau */}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(course.category)}`}>
            {course.category}
          </span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center justify-between">
          <Link 
            to={`/courses/${course.id}`}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    // Lấy search query từ URL
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    
    // Lấy thông tin user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchCourses();
  }, [selectedLevel, selectedCategory, location.search]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8000/api/auth/courses/';
      const params = new URLSearchParams();
      
      if (selectedLevel) params.append('level', selectedLevel);
      if (selectedCategory) params.append('category', selectedCategory);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải khóa học:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm">
            <Link to="/" className="text-indigo-600 hover:text-indigo-500">Trang chủ</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">Khóa học</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-white to-slate-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Khóa học</h1>
              <p className="mt-2 text-slate-600">
                Khám phá {courses.length} khóa học chất lượng cao
              </p>
            </div>
            
            {/* Add Course Button for Teachers */}
            {user && user.role === 'teacher' && (
              <div>
                <Link 
                  to="/courses/add"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm khóa học
                </Link>
              </div>
            )}
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học, chuyên mục"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả cấp độ</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả chuyên mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {(selectedLevel || selectedCategory) && (
              <button
                onClick={() => {
                  setSelectedLevel('');
                  setSelectedCategory('');
                }}
                className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-500"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 h-48 rounded-xl"></div>
                <div className="mt-4 space-y-2">
                  <div className="bg-slate-200 h-4 rounded"></div>
                  <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-slate-600">
              {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' : 'Chưa có khóa học nào phù hợp với bộ lọc của bạn'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
