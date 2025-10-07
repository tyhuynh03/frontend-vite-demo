import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Vui lòng đăng nhập để xem trang này</p>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  const getAvatarText = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'teacher': return 'Giảng viên';
      case 'student': return 'Học viên';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {getAvatarText(user.username)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.username}</h1>
              <p className="text-slate-600 mb-4">{user.email}</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {getRoleText(user.role)}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Thông tin tài khoản</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <p className="mt-1 text-slate-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Vai trò</label>
                <p className="mt-1 text-slate-900">{getRoleText(user.role)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Ngày tạo tài khoản</label>
                <p className="mt-1 text-slate-900">
                  {new Date(user.created_at).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


