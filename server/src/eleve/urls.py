from django.urls import path
from .views import EleveView

urlpatterns = [
    path('', EleveView.as_view(), name='eleve-list-post'),
    path('<int:pk>', EleveView.as_view(), name='eleve-update-delete'),
]