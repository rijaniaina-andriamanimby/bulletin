from rest_framework import serializers
from note.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'eleve', 'matiere', 'session', 'typeNote', 'valeur', 'coefficient', 'enseignant']