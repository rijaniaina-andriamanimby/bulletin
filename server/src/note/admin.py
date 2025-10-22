from django.contrib import admin
from .models import Note, Bulletin


# Register your models here.
@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'eleve', 'matiere', 'session', 'typeNote', 'valeur', 'coefficient', 'enseignant')

@admin.register(Bulletin)
class BulletinAdmin(admin.ModelAdmin):
    list_display = ('id','eleve', 'session', 'date_generation', 'moyenne_generale', 'appreciation')