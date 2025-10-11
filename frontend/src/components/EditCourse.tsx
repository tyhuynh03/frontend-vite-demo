import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import type { CourseFormData } from '../types/course';

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

function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    introduction: '',
    requirements: '',
    objectives: '',
    content: '',
    exercises: '',
    progress_schedule: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra user có phải teacher không
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    if (parsedUser.role !== 'teacher') {
      navigate('/courses');
      return;
    }

    // Fetch course data
    fetchCourse();
  }, [navigate, id]);

  const fetchCourse = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(`http://localhost:8000/api/auth/courses/${id}/`);
      
      if (response.ok) {
        const courseData = await response.json();
        
        // Kiểm tra user có phải là người tạo khóa học không
        if (user && courseData.created_by !== null && courseData.created_by !== user.id && user.role !== 'admin') {
          navigate('/courses');
          return;
        }
        
        setFormData({
          title: courseData.title,
          introduction: courseData.introduction || '',
          requirements: courseData.requirements || '',
          objectives: courseData.objectives || '',
          content: courseData.content || '',
          exercises: courseData.exercises || '',
          progress_schedule: courseData.progress_schedule || '',
          notes: courseData.notes || ''
        });
      } else {
        setError('Không tìm thấy khóa học');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi tải dữ liệu khóa học');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.role !== 'teacher') {
      setError('Bạn không có quyền chỉnh sửa khóa học');
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      setError('Vui lòng nhập tên khóa học');
      return;
    }
    if (!formData.introduction.trim()) {
      setError('Vui lòng nhập giới thiệu sơ lược');
      return;
    }
    if (!formData.content.trim()) {
      setError('Vui lòng nhập nội dung khóa học');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/auth/courses/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate(`/courses/${id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Có lỗi xảy ra khi cập nhật khóa học');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'teacher') {
    return null;
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-white text-slate-800">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Đang tải dữ liệu khóa học...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm">
            <Link to="/" className="text-indigo-600 hover:text-indigo-500">Trang chủ</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link to="/courses" className="text-indigo-600 hover:text-indigo-500">Khóa học</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link to={`/courses/${id}`} className="text-indigo-600 hover:text-indigo-500">Chi tiết</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">Chỉnh sửa</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Chỉnh sửa khóa học</h1>
          <p className="mt-2 text-slate-600">
            Cập nhật thông tin khóa học
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Thông tin cơ bản</h2>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Tên khóa học *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Nhập tên khóa học"
                required
              />
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Giới thiệu sơ lược</h2>
            <div>
              <label htmlFor="introduction" className="block text-sm font-medium text-slate-700 mb-2">
                Giới thiệu về khóa học *
              </label>
              <textarea
                id="introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Giới thiệu tổng quan về khóa học..."
                required
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Yêu cầu đầu vào</h2>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-slate-700 mb-2">
                Yêu cầu kiến thức và kỹ năng
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Kiến thức nền tảng, kỹ năng cần có trước khi tham gia..."
              />
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Mục tiêu khóa học</h2>
            <div>
              <label htmlFor="objectives" className="block text-sm font-medium text-slate-700 mb-2">
                Mục tiêu học tập
              </label>
              <textarea
                id="objectives"
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Những gì học viên sẽ đạt được sau khóa học..."
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Nội dung khóa học</h2>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
                Nội dung chi tiết *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Mô tả chi tiết nội dung khóa học, chương trình học..."
                required
              />
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Bài tập</h2>
            <div>
              <label htmlFor="exercises" className="block text-sm font-medium text-slate-700 mb-2">
                Bài tập thực hành
              </label>
              <textarea
                id="exercises"
                name="exercises"
                value={formData.exercises}
                onChange={handleInputChange}
                rows={6}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Các bài tập, dự án thực hành trong khóa học..."
              />
            </div>
          </div>

          {/* Progress Schedule */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Tiến độ đề xuất</h2>
            <div>
              <label htmlFor="progress_schedule" className="block text-sm font-medium text-slate-700 mb-2">
                Lịch trình học tập đề xuất
              </label>
              <textarea
                id="progress_schedule"
                name="progress_schedule"
                value={formData.progress_schedule}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Thời gian học tập, lịch trình đề xuất..."
              />
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Lưu ý, ghi chú</h2>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
                Lưu ý quan trọng
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Các lưu ý, ghi chú quan trọng cho học viên..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Link
              to={`/courses/${id}`}
              className="rounded-lg border border-slate-300 px-6 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Hủy
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang cập nhật...
                </div>
              ) : (
                'Cập nhật khóa học'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
