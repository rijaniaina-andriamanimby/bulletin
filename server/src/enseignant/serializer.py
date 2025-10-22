from rest_framework import serializers
from enseignant.models import Enseignant


class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant
        fields = ['id', 'prenom', 'nom', 'email']