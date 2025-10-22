from rest_framework import serializers
from matiere.models import Matiere


class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = ['id', 'nom']