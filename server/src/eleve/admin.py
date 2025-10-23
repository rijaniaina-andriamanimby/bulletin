from django.contrib import admin
from .models import Eleve

# Register your models here.
@admin.register(Eleve)
class EleveAdmin(admin.ModelAdmin):
    list_display = ('id', 'prenom', 'nom', 'naissance', 'genre', 'matricule', 'classe')
    search_fields = ('prenom', 'nom')