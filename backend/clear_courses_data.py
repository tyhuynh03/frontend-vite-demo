#!/usr/bin/env python
"""
Script để xóa tất cả dữ liệu khóa học trong database
"""

import os
import sys
import django
from pathlib import Path

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Course

def clear_courses_data():
    """Xóa tất cả dữ liệu khóa học trong database"""
    
    print("🗑️  Bắt đầu xóa dữ liệu khóa học...")
    
    # Đếm số khóa học hiện có
    total_courses = Course.objects.count()
    
    if total_courses == 0:
        print("✅ Không có khóa học nào trong database!")
        return
    
    print(f"📊 Tìm thấy {total_courses} khóa học trong database")
    
    # Hiển thị danh sách khóa học sẽ bị xóa (nếu có flag --info)
    if len(sys.argv) > 1 and sys.argv[1] == '--info':
        print("\n📋 Danh sách khóa học sẽ bị xóa:")
        courses = Course.objects.all()
        for i, course in enumerate(courses, 1):
            print(f"  {i}. ID: {course.id} - Title: {course.title}")
        print()
    
    # Xác nhận xóa
    confirm = input(f"⚠️  Bạn có chắc chắn muốn xóa {total_courses} khóa học? (yes/no): ")
    
    if confirm.lower() not in ['yes', 'y', 'có', 'c']:
        print("❌ Hủy bỏ việc xóa dữ liệu!")
        return
    
    try:
        # Xóa tất cả khóa học
        deleted_count, _ = Course.objects.all().delete()
        
        print(f"✅ Đã xóa thành công {deleted_count} khóa học!")
        print("🎉 Database khóa học đã được làm sạch!")
        
    except Exception as e:
        print(f"❌ Lỗi khi xóa dữ liệu: {e}")

if __name__ == '__main__':
    clear_courses_data()
