from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from matiere.models import Matiere
from matiere.serialiser import MatiereSerializer


# Create your views here.
class MatiereView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            matieres = Matiere.objects.all()
            serializer = MatiereSerializer(matieres, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                matiere = Matiere.objects.get(pk=pk)
                serializer = MatiereSerializer(matiere, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Matiere.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = MatiereSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        matiere = Matiere.objects.get(pk=pk)
        serializer = MatiereSerializer(matiere, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        matiere = Matiere.objects.get(pk=pk)
        matiere.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)