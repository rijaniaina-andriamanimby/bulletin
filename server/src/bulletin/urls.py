"""
URL configuration for bulletin project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from authentification.views import EmailObtainPairView

urlpatterns = [
    path('', include('authentification.urls')),
    path('admin/', admin.site.urls),
    path('eleves/', include('eleve.urls')),
    path('classes/', include('classe.urls')),
    path('enseignants/', include('enseignant.urls')),
    path('matieres/', include('matiere.urls')),
    path('notes/', include('note.urls')),
    path('token/', EmailObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
]
