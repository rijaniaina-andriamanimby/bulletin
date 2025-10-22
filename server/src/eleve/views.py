from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Eleve
from .serializer import EleveSerializer


# Create your views here.
class EleveView(APIView):
    def get(self,request, pk=None):
        """
        Return all eleves list
        """
        if pk is None:
            eleves = Eleve.objects.all()
            serializer = EleveSerializer(eleves, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                eleve = Eleve.objects.get(pk=pk)
                serializer = EleveSerializer(eleve)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Eleve.DoesNotExist:
                return Response(
                    {"detail": "Élève non trouvé."},
                    status=status.HTTP_404_NOT_FOUND
                )

    def post(self,request):
        """
        Create new eleve
        """
        serializer = EleveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk):
        eleve = Eleve.objects.get(pk=pk)
        eleve.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self,request, pk):
        eleve = Eleve.objects.get(pk=pk)
        serializer = EleveSerializer(eleve, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)