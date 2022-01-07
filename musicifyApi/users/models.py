from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class cUserManager(BaseUserManager):
    def create_user(self, email, password, **others):
        email = self.normalize_email(email)
        user = self.model(email=email, **others)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password, **others):
        others.setdefault('is_active', True)
        others.setdefault('is_superuser', True)
        others.setdefault('is_staff', True)

        return self.create_user(email, password, **others)

class cUser(AbstractUser):
    username = None;
    email = models.EmailField(max_length=128, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    password = models.CharField(max_length=128)

    band_name = models.CharField(max_length=72, unique=True, null=True)

    profile = models.ImageField(upload_to='profiles/')

    joined_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email';
    REQUIRED_FIELDS = []

    objects = cUserManager()