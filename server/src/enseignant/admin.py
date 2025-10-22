from django.contrib import admin
from .models import Enseignant


# Register your models here.
@admin.register(Enseignant)
class EnseignantAdmin(admin.ModelAdmin):
    list_display = ('id', 'prenom', 'nom', 'email')
    search_fields = ('prenom', 'nom')