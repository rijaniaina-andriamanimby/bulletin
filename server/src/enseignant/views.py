from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from enseignant.models import Enseignant
from enseignant.serializer import EnseignantSerializer


# Create your views here.
class EnseignantView(APIView):
    def get(self, request, pk=None):
        """
        Pour lister tous les Enseignant
        Args:
            request: c'est la requete
            pk: id de l'Enseignant

        Returns: la lise des Enseignant

        """
        if pk is None:
            enseignants = Enseignant.objects.all()
            serializer = EnseignantSerializer(enseignants, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                enseignant = Enseignant.objects.get(pk=pk)
                serializer = EnseignantSerializer(enseignant, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Enseignant.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = EnseignantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        enseignant = Enseignant.objects.get(pk=pk)
        serializer = EnseignantSerializer(instance=enseignant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        enseignant = Enseignant.objects.get(pk=pk)
        enseignant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
