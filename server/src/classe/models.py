from django.db import models

# Create your models here.
class Classe(models.Model):
    # 6e, 5e, 4e, 3e, 2nde, 1ere, Terminale
    nom = models.CharField(max_length=50, unique=True)  # ex: '6ème A' or '2ndeB'

    def __str__(self):
        return self.nom