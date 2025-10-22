from django.urls import path
from .views import ClassView

urlpatterns = [
    path('', ClassView.as_view(), name='classe-list-post'),
    path('<int:pk>', ClassView.as_view(), name='classe-update-delete'),
]