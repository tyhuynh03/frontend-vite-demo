import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.management import call_command
from accounts.models import User

def setup_database():
    print("=" * 60)
    print("🔧 SETUP DATABASE - MOOC HỌC VỤ SỐ")
    print("=" * 60)
    
    print("\n📌 Lưu ý: Đảm bảo bạn đã:")
    print("   1. Cài đặt PostgreSQL")
    print("   2. Tạo database: CREATE DATABASE mooc_db;")
    print("   3. Tạo file .env ")
    print("   4. Cập nhật thông tin database trong .env")
    
    input("\n👉 Nhấn Enter để tiếp tục...")
    
    print("\n🔨 Đang chạy migrations...")
    try:
        # Bước 1: Tạo migrations cho accounts app trước (quan trọng!)
        print("   Step 1: Tạo User model migrations...")
        call_command('makemigrations', 'accounts')
        
        # Bước 2: Migrate User model trước
        print("   Step 2: Migrate User model...")
        call_command('migrate', 'accounts')
        
        # Bước 3: Tạo migrations cho các app khác
        print("   Step 3: Tạo migrations cho các app còn lại...")
        call_command('makemigrations')
        
        # Bước 4: Migrate tất cả
        print("   Step 4: Migrate tất cả...")
        call_command('migrate')
        
        print("✅ Migration hoàn tất!")
    except Exception as e:
        print(f"❌ Lỗi migration: {e}")
        print("\n💡 Kiểm tra:")
        print("   - PostgreSQL đã chạy chưa?")
        print("   - Database 'mooc_db' đã tạo chưa?")
        print("   - File .env có đúng thông tin không?")
        print("\n📝 Thử chạy thủ công:")
        print("   python manage.py makemigrations accounts")
        print("   python manage.py migrate accounts")
        print("   python manage.py migrate")
        return
    
    print("\n" + "=" * 60)
    create_admin = input("👤 Bạn có muốn tạo superuser (admin)? (y/n): ")
    if create_admin.lower() == 'y':
        print("\n📝 Nhập thông tin admin:")
        call_command('createsuperuser')
    
    print("\n" + "=" * 60)
    create_test_users = input("🧪 Bạn có muốn tạo test users? (y/n): ")
    if create_test_users.lower() == 'y':
        test_users = [
            {'username': 'student1', 'email': 'student1@test.com', 'password': 'test123456', 'role': 'student'},
            {'username': 'teacher1', 'email': 'teacher1@test.com', 'password': 'test123456', 'role': 'teacher'},
        ]
        
        print("\n🔄 Đang tạo test users...")
        for user_data in test_users:
            if not User.objects.filter(email=user_data['email']).exists():
                User.objects.create_user(**user_data)
                print(f"✅ Đã tạo user: {user_data['email']} (password: test123456)")
            else:
                print(f"⚠️  User {user_data['email']} đã tồn tại")
    
    print("\n" + "=" * 60)
    print("🎉 SETUP HOÀN TẤT!")
    print("=" * 60)
    print("\n📝 Các bước tiếp theo:")
    print("   1. Chạy server: python manage.py runserver")
    print("   2. Truy cập admin: http://localhost:8000/admin/")
    print("   3. Test API: http://localhost:8000/api/auth/")
    print("\n" + "=" * 60)

if __name__ == '__main__':
    setup_database()

