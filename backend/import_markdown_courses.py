#!/usr/bin/env python
"""
Script để import khóa học từ các file markdown trong thư mục khoa_hoc
"""

import os
import sys
import django
import re
from pathlib import Path

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Course

def clean_markdown_content(text):
    """Làm sạch nội dung markdown, bỏ định dạng và icon nhưng giữ dấu tiếng Việt"""
    if not text:
        return ""
    
    # Bỏ markdown bold **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    
    # Bỏ markdown italic *text*
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    
    # Bỏ markdown links [text](url)
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    
    # Bỏ markdown headers ### Header
    text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)
    
    # Bỏ markdown list markers - item hoặc * item
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    
    # Bỏ markdown code blocks ```
    text = re.sub(r'```[^`]*```', '', text, flags=re.DOTALL)
    
    # Bỏ markdown inline code `code`
    text = re.sub(r'`([^`]+)`', r'\1', text)
    
    # Bỏ các icon phổ biến (emoji và symbol)
    text = re.sub(r'[✅❌⚠️🎉🚀📁📄💻🎨🛡️📊🤖🧪🧹📋💡⭐🔍🎯📝🔧🔄]', '', text)
    
    # Bỏ các symbol đặc biệt khác
    text = re.sub(r'[→←↑↓◆◇●○■□▲△▼▽]', '', text)
    
    # Bỏ dấu gạch ngang markdown ---
    text = re.sub(r'^---+$', '', text, flags=re.MULTILINE)
    
    # Làm sạch khoảng trắng thừa
    text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)  # Bỏ dòng trống thừa
    text = re.sub(r'^\s+|\s+$', '', text, flags=re.MULTILINE)  # Bỏ khoảng trắng đầu/cuối dòng
    text = text.strip()  # Bỏ khoảng trắng đầu/cuối toàn bộ
    
    return text

def extract_course_data_from_markdown(file_path):
    """Trích xuất dữ liệu khóa học từ file markdown"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Tìm tiêu đề (dòng đầu tiên bắt đầu bằng #)
        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = clean_markdown_content(title_match.group(1)) if title_match else "Khóa học chưa có tiêu đề"
        
        # Tìm các phần chính
        sections = {}
        
        # Tìm "Giới thiệu sơ lược"
        intro_match = re.search(r'##\s+1\.\s+Giới thiệu sơ lược\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if intro_match:
            sections['introduction'] = clean_markdown_content(intro_match.group(1))
        
        # Tìm "Yêu cầu đầu vào"
        req_match = re.search(r'##\s+2\.\s+Yêu cầu đầu vào\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if req_match:
            sections['requirements'] = clean_markdown_content(req_match.group(1))
        
        # Tìm "Mục tiêu khóa học"
        obj_match = re.search(r'##\s+3\.\s+Mục tiêu khóa học\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if obj_match:
            sections['objectives'] = clean_markdown_content(obj_match.group(1))
        
        # Tìm "Nội dung khóa học"
        content_match = re.search(r'##\s+4\.\s+Nội dung khóa học\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if content_match:
            sections['content'] = clean_markdown_content(content_match.group(1))
        
        # Tìm "Bài tập"
        ex_match = re.search(r'##\s+5\.\s+Bài tập\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if ex_match:
            sections['exercises'] = clean_markdown_content(ex_match.group(1))
        
        # Tìm "Tiến độ đề xuất"
        prog_match = re.search(r'##\s+6\.\s+Tiến độ đề xuất\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if prog_match:
            sections['progress_schedule'] = clean_markdown_content(prog_match.group(1))
        
        # Tìm "Lưu ý, ghi chú"
        notes_match = re.search(r'##\s+7\.\s+Lưu ý, ghi chú\s*\n\n(.*?)(?=##|\Z)', content, re.DOTALL)
        if notes_match:
            sections['notes'] = clean_markdown_content(notes_match.group(1))
        
        return {
            'title': title,
            'introduction': sections.get('introduction', ''),
            'requirements': sections.get('requirements', ''),
            'objectives': sections.get('objectives', ''),
            'content': sections.get('content', ''),
            'exercises': sections.get('exercises', ''),
            'progress_schedule': sections.get('progress_schedule', ''),
            'notes': sections.get('notes', ''),
        }
    
    except Exception as e:
        print(f"Lỗi khi đọc file {file_path}: {e}")
        return None

def import_markdown_courses():
    """Import tất cả khóa học từ các file markdown"""
    
    # Tìm thư mục khoa_hoc
    khoa_hoc_dir = Path(__file__).parent / 'khoa_hoc'
    
    if not khoa_hoc_dir.exists():
        print(f"Thư mục {khoa_hoc_dir} không tồn tại!")
        return
    
    # Tìm tất cả file .md
    md_files = list(khoa_hoc_dir.glob('*.md'))
    
    if not md_files:
        print("Không tìm thấy file markdown nào!")
        return
    
    print(f"Tìm thấy {len(md_files)} file markdown")
    
    # Tìm user admin để làm created_by
    from core.models import User
    admin_user = None
    try:
        admin_user = User.objects.filter(email='admin@gmail.com').first()
        if admin_user:
            print(f"✅ Tìm thấy admin user: {admin_user.username} ({admin_user.email})")
        else:
            print("⚠️  Không tìm thấy user admin với email admin@gmail.com")
            print("   Khóa học sẽ được tạo với created_by = null")
    except Exception as e:
        print(f"⚠️  Lỗi khi tìm admin user: {e}")
        print("   Khóa học sẽ được tạo với created_by = null")
    
    imported_count = 0
    skipped_count = 0
    
    for md_file in md_files:
        print(f"\nĐang xử lý: {md_file.name}")
        
        # Trích xuất dữ liệu
        course_data = extract_course_data_from_markdown(md_file)
        
        if not course_data:
            print(f"  ❌ Không thể đọc dữ liệu từ {md_file.name}")
            skipped_count += 1
            continue
        
        # Kiểm tra xem khóa học đã tồn tại chưa
        existing_course = Course.objects.filter(title=course_data['title']).first()
        if existing_course:
            print(f"  ⚠️  Khóa học '{course_data['title']}' đã tồn tại, bỏ qua...")
            skipped_count += 1
            continue
        
        # Tạo khóa học mới
        try:
            course = Course.objects.create(
                title=course_data['title'],
                introduction=course_data['introduction'],
                requirements=course_data['requirements'],
                objectives=course_data['objectives'],
                content=course_data['content'],
                exercises=course_data['exercises'],
                progress_schedule=course_data['progress_schedule'],
                notes=course_data['notes'],
                created_by=admin_user,  # Sử dụng admin_user nếu tìm thấy, nếu không sẽ là None
                is_active=True
            )
            
            created_by_info = f" (created_by: {admin_user.username})" if admin_user else " (created_by: null)"
            print(f"  ✅ Đã tạo khóa học: '{course_data['title']}' (ID: {course.id}){created_by_info}")
            imported_count += 1
            
        except Exception as e:
            print(f"  ❌ Lỗi khi tạo khóa học '{course_data['title']}': {e}")
            skipped_count += 1
    
    print(f"\n🎉 Hoàn thành import!")
    print(f"✅ Đã import: {imported_count} khóa học")
    print(f"⚠️  Đã bỏ qua: {skipped_count} khóa học")

if __name__ == '__main__':
    import_markdown_courses()
