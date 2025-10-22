from django.urls import path
from .views import MatiereView

urlpatterns = [
    path('', MatiereView.as_view(), name='matiere-list-post'),
    path('<int:pk>', MatiereView.as_view(), name='matiere-put-gelete'),
]