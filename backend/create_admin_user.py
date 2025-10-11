#!/usr/bin/env python
"""
Script để tạo user admin với email admin@gmail.com
"""

import os
import sys
import django
from pathlib import Path

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import User

def create_admin_user():
    """Tạo user admin với email admin@gmail.com"""
    
    print("🔧 Tạo user admin...")
    
    # Kiểm tra xem user admin đã tồn tại chưa
    existing_admin = User.objects.filter(email='admin@gmail.com').first()
    
    if existing_admin:
        print(f"✅ User admin đã tồn tại:")
        print(f"   - Username: {existing_admin.username}")
        print(f"   - Email: {existing_admin.email}")
        print(f"   - Role: {existing_admin.role}")
        return existing_admin
    
    try:
        # Tạo user admin mới
        admin_user = User.objects.create_user(
            username='admin',
            email='admin@gmail.com',
            password='admin123',  # Mật khẩu mặc định
            role='admin'
        )
        
        print(f"✅ Đã tạo user admin thành công:")
        print(f"   - Username: {admin_user.username}")
        print(f"   - Email: {admin_user.email}")
        print(f"   - Role: {admin_user.role}")
        print(f"   - Password: admin123")
        
        return admin_user
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo user admin: {e}")
        return None

if __name__ == '__main__':
    create_admin_user()
