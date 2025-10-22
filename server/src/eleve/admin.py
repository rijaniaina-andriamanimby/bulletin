from django.contrib import admin
from .models import Eleve

# Register your models here.
@admin.register(Eleve)
class EleveAdmin(admin.ModelAdmin):
    list_display = ('id', 'prenom', 'nom', 'date_naissance', 'genre', 'numero_inscription', 'classe')
    search_fields = ('prenom', 'nom')