from django.contrib import admin
from .models import Classe

# Register your models here.
@admin.register(Classe)
class ClasseAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')
    search_fields = ['nom']