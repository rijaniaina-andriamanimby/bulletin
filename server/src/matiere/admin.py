from django.contrib import admin
from .models import Matiere


# Register your models here.
@admin.register(Matiere)
class MatiereAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')
    search_fields = ['nom']