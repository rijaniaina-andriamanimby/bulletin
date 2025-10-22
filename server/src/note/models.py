from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from eleve.models import Eleve
from matiere.models import Matiere
from enseignant.models import Enseignant


TYPE = [
    ("Note 1", "Note 1"),
    ("Note 2", "Note 2"),
    ("Examen", "Examen"),
]

SESSION = [
    ("Trimestre 1", "Trimestre 1"),
    ("Trimestre 2", "Trimestre 2"),
    ("Trimestre 3", "Trimestre 3")
]

# Create your models here.
class Note(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='notes')
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    session = models.CharField(choices=SESSION, max_length=12, default='Trimestre 1')
    typeNote = models.CharField(choices=TYPE,max_length=120)
    valeur = models.DecimalField(max_digits=5, decimal_places=2,validators=[MinValueValidator(0), MaxValueValidator(20)])
    coefficient = models.PositiveSmallIntegerField(default=1)
    enseignant = models.ForeignKey(Enseignant, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('eleve', 'matiere', 'session', 'typeNote')

    def __str__(self):
        return f"{self.eleve} - {self.matiere}: {self.valeur} ({self.session})"


# Optionnel: bulletin/report
class Bulletin(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='bulletins')
    session = session = models.CharField(choices=SESSION, max_length=12, default='Trimestre 1')
    date_generation = models.DateTimeField(auto_now_add=True)
    moyenne_generale = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    appreciation = models.TextField(blank=True)

    class Meta:
        unique_together = ('eleve', 'session')

    def __str__(self):
        return f"Bulletin: {self.eleve} - {self.session}"