from rest_framework import serializers
from note.models import Note


class NoteSerializer(serializers.ModelSerializer):
    nomEleveComplet = serializers.SerializerMethodField()
    nomEnseignantComplet = serializers.SerializerMethodField()
    classe = serializers.CharField(source='eleve.classe.id', read_only=True)
    matiereNom = serializers.CharField(source='matiere.nom', read_only=True)

    class Meta:
        model = Note
        fields = [
            'id', 'eleve', 'matiere',
            'session', 'typeNote', 'valeur',
            'coefficient', 'enseignant', 'nomEleveComplet',
            'classe', 'nomEnseignantComplet', 'matiereNom'
        ]


    def get_nomEnseignantComplet(self, obj):
        if obj.enseignant:
            return f"{obj.enseignant.nom} {obj.enseignant.prenom}"
        return None

    def get_nomEleveComplet(self, obj):
        if obj.eleve:
            return f"{obj.eleve.nom} {obj.eleve.prenom}"
        return None