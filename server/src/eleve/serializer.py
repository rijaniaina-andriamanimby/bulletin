from rest_framework import serializers
from .models import Eleve

class EleveSerializer(serializers.ModelSerializer):
    # Ce champ est en lecture seule, il ne sera utilisé que pour la SÉRIALISATION (affichage)
    # et sera ignoré lors de la DÉSÉRIALISATION (création/mise à jour).
    nomClasse = serializers.CharField(source='classe.nom', read_only=True)

    class Meta:
        model = Eleve
        fields = ['id', 'prenom', 'nom', 'naissance', 'genre', 'matricule', 'classe', 'nomClasse']