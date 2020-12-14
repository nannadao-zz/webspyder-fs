from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
  def create_user(self, email, name, password=None):
    if not email:
      raise ValueError('User must have email address')
    
    email = self.normalize_email(email)
    user = self.model(email=email, name=name)

    user.set_password(password)
    user.save()

    return user
  
  def create_superuser(self, email, name, password):
    user = self.create_user(email, name, password=password)

    user.is_superuser = True
    user.is_admin = True
    user.save()

    return user

# Create your models here.
class UserAccount(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=250, unique=True)
  name = models.CharField(max_length=250)
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)

  objects = UserAccountManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name']

  def get_full_name(self):
    return self.name

  def get_short_name(self):
    return self.name
  
  def __str__(self):
    return self.email