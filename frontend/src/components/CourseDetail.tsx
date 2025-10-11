import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import type { Course } from '../types/course';

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

function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gioi-thieu');
  const [user, setUser] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Lấy thông tin user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/auth/courses/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        console.error('Không tìm thấy khóa học');
      }
    } catch (error) {
      console.error('Lỗi khi tải khóa học:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!user || !course) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/auth/courses/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Redirect to courses page after successful deletion
        window.location.href = '/courses';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Có lỗi xảy ra khi xóa khóa học');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi kết nối đến server');
    }
  };

  const tabs = [
    { id: 'gioi-thieu', label: 'Giới thiệu' },
    { id: 'yeu-cau', label: 'Yêu cầu đầu vào' },
    { id: 'muc-tieu', label: 'Mục tiêu khóa học' },
    { id: 'noi-dung', label: 'Nội dung khóa học' },
    { id: 'bai-tap', label: 'Bài tập' },
    { id: 'tien-do', label: 'Tiến độ đề xuất' },
    { id: 'luu-y', label: 'Lưu ý, ghi chú' },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy khóa học</h2>
            <p className="text-slate-600 mb-4">Khóa học bạn tìm kiếm không tồn tại.</p>
            <Link to="/courses" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Quay lại danh sách khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm">
            <Link to="/" className="text-indigo-600 hover:text-indigo-500">Trang chủ</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link to="/courses" className="text-indigo-600 hover:text-indigo-500">Khóa học</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 text-slate-800 border-b">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col">
            {/* Course Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-slate-900">
              {course.title}
            </h1>
            
            {/* Course Introduction */}
            {course.introduction && (
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {course.introduction}
              </p>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Xem khóa học
              </button>
              
              {/* Edit/Delete buttons for course owner */}
              {user && course && (course.created_by === null || user.id === course.created_by || user.role === 'admin') && (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/courses/${course.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Chỉnh sửa
                  </Link>
                  
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {activeTab === 'gioi-thieu' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Giới thiệu về khóa học</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.introduction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'yeu-cau' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Yêu cầu đầu vào</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.requirements || 'Chưa có thông tin về yêu cầu đầu vào.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'muc-tieu' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Mục tiêu khóa học</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.objectives || 'Chưa có thông tin về mục tiêu khóa học.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'noi-dung' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Nội dung khóa học</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.content || 'Chưa có thông tin về nội dung khóa học.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bai-tap' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bài tập</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.exercises || 'Chưa có thông tin về bài tập.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tien-do' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Tiến độ đề xuất</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.progress_schedule || 'Chưa có thông tin về tiến độ đề xuất.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'luu-y' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Lưu ý, ghi chú</h2>
              <div className="prose prose-slate max-w-none">
                <div className="bg-yellow-50 rounded-lg p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {course.notes || 'Chưa có lưu ý hoặc ghi chú nào.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Xác nhận xóa khóa học</h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              Bạn có chắc chắn muốn xóa khóa học "{course?.title}"? 
              Hành động này không thể hoàn tác.
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa khóa học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetailPage;
