from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email là bắt buộc')
        if not username:
            raise ValueError('Username là bắt buộc')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email


class Course(models.Model):
    title = models.CharField(verbose_name="Tên khóa học")
    introduction = models.TextField(verbose_name="Giới thiệu sơ lược", default="")
    requirements = models.TextField(verbose_name="Yêu cầu đầu vào", default="")
    objectives = models.TextField(verbose_name="Mục tiêu khóa học", default="")
    content = models.TextField(verbose_name="Nội dung khóa học", default="")
    exercises = models.TextField(verbose_name="Bài tập", default="")
    progress_schedule = models.TextField(verbose_name="Tiến độ đề xuất", default="")
    notes = models.TextField(verbose_name="Lưu ý, ghi chú", default="")
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Người tạo", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, verbose_name="Trạng thái hoạt động")
    
    class Meta:
        db_table = 'courses'
        verbose_name = 'Khóa học'
        verbose_name_plural = 'Khóa học'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title