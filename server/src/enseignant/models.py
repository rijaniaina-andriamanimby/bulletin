from django.db import models


# Create your models here.
class Enseignant(models.Model):
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"