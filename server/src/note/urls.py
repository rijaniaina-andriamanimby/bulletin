from django.urls import path
from note.views import NoteView

urlpatterns = [
    path('', NoteView.as_view(), name='note-list-post'),
    path('<int:pk>/', NoteView.as_view(), name='note-put-delete'),
]