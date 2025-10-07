import os
import sys
from pathlib import Path

def check_environment():
    print("=" * 60)
    print("🔍 KIỂM TRA MÔI TRƯỜNG SETUP")
    print("=" * 60)
    
    errors = []
    warnings = []
    success = []
    
    # Check Python version
    print("\n1️⃣ Kiểm tra Python...")
    py_version = sys.version_info
    if py_version.major == 3 and py_version.minor >= 8:
        success.append(f"✅ Python {py_version.major}.{py_version.minor}.{py_version.micro}")
    else:
        errors.append(f"❌ Python version không đủ (cần 3.8+, hiện tại: {py_version.major}.{py_version.minor})")
    
    # Check virtual environment
    print("2️⃣ Kiểm tra Virtual Environment...")
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        success.append("✅ Virtual environment đã được activate")
    else:
        warnings.append("⚠️  Virtual environment chưa được activate")
    
    # Check .env file
    print("3️⃣ Kiểm tra file .env...")
    env_file = Path('.env')
    if env_file.exists():
        success.append("✅ File .env tồn tại")
        
        with open(env_file, 'r', encoding='utf-8') as f:
            env_content = f.read()
            
        if 'DATABASE_PASSWORD' in env_content:
            if 'your_password' in env_content or 'your-password' in env_content:
                warnings.append("⚠️  DATABASE_PASSWORD chưa được cập nhật")
            else:
                success.append("✅ DATABASE_PASSWORD đã được set")
        
        if 'SECRET_KEY' in env_content:
            success.append("✅ SECRET_KEY đã được set")
    else:
        errors.append("❌ File .env không tồn tại (copy từ env_example.txt)")
    
    # Check Django
    print("4️⃣ Kiểm tra Django...")
    try:
        import django
        success.append(f"✅ Django {django.get_version()} đã cài đặt")
    except ImportError:
        errors.append("❌ Django chưa được cài đặt (pip install -r requirements.txt)")
    
    # Check DRF
    print("5️⃣ Kiểm tra Django REST Framework...")
    try:
        import rest_framework
        success.append("✅ Django REST Framework đã cài đặt")
    except ImportError:
        errors.append("❌ Django REST Framework chưa được cài đặt")
    
    # Check database drivers
    print("6️⃣ Kiểm tra Database Drivers...")
    try:
        import psycopg2
        success.append("✅ psycopg2 (PostgreSQL) đã cài đặt")
    except ImportError:
        warnings.append("⚠️  psycopg2 chưa được cài đặt")
    
    
    # Check database connection
    if not errors:
        print("7️⃣ Kiểm tra kết nối Database...")
        try:
            os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
            import django
            django.setup()
            from django.db import connection
            connection.ensure_connection()
            success.append("✅ Kết nối database thành công")
        except Exception as e:
            errors.append(f"❌ Không thể kết nối database: {str(e)[:100]}")
    
    # Print results
    print("\n" + "=" * 60)
    print("📊 KẾT QUẢ KIỂM TRA")
    print("=" * 60)
    
    if success:
        print("\n✅ THÀNH CÔNG:")
        for msg in success:
            print(f"   {msg}")
    
    if warnings:
        print("\n⚠️  CẢNH BÁO:")
        for msg in warnings:
            print(f"   {msg}")
    
    if errors:
        print("\n❌ LỖI:")
        for msg in errors:
            print(f"   {msg}")
    
    print("\n" + "=" * 60)
    
    if errors:
        print("❌ Setup chưa hoàn tất - Vui lòng sửa các lỗi trên")
        print("\n💡 Các bước khắc phục:")
        print("   1. Cài đặt dependencies: pip install -r requirements.txt")
        print("   2. Tạo file .env từ env_example.txt")
        print("   3. Cập nhật thông tin database trong .env")
        print("   4. Đảm bảo PostgreSQL đang chạy và database đã được tạo")
    elif warnings:
        print("⚠️  Setup gần hoàn tất - Có một số cảnh báo")
    else:
        print("✅ Setup hoàn tất! Sẵn sàng chạy server")
        print("\n📝 Bước tiếp theo:")
        print("   python manage.py migrate")
        print("   python manage.py runserver")
    
    print("=" * 60)

if __name__ == '__main__':
    check_environment()




