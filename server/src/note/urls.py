from django.urls import path
from .views import NoteView, BulletinView

urlpatterns = [
    path('', NoteView.as_view(), name='note-list-post'),
    path('<int:pk>/', NoteView.as_view(), name='note-put-delete'),
    path('bulletin', BulletinView.as_view(), name='bulletin-list-post'),
    path('bulletin/<int:pk>/', BulletinView.as_view(), name='bulletin-put-delete'),
]