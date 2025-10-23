from django.db import models
from classe.models import Classe


GENRE_CHOIX = [
    ('F', 'Feminin'),
    ('G', 'Masculin'),
]
# Create your models here.
class Eleve(models.Model):
    # Élève = Student
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    naissance = models.DateField(blank=True, null=True)
    genre = models.CharField(choices=GENRE_CHOIX, max_length=2)
    matricule = models.CharField(max_length=50, unique=True)
    classe = models.ForeignKey(Classe, on_delete=models.SET_NULL, null=True, related_name='eleves')

    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.matricule}"
