from django.urls import path
from .views import EnseignantView

urlpatterns = [
    path('', EnseignantView.as_view(), name='-list-post'),
    path('<int:pk>', EnseignantView.as_view(), name='enseignant-put-delete'),
]