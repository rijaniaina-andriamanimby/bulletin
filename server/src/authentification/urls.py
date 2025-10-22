from django.urls import path
from . import views
urlpatterns = [
    path('connexion/', views.HomeView.as_view(), name ='login'),
    path('deconnexion/', views.LogoutView.as_view(), name ='logout')
]