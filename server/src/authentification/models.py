from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email' # On utilise email comme identifiant
    REQUIRED_FIELDS = ['username'] # Pour compatibilité admin

    def __str__(self):
        return self.email