from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from classe.models import Classe
from classe.serializer import ClasseSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class ClassView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk=None):
        if pk is None:
            classes = Classe.objects.all()
            serializer = ClasseSerializer(classes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                classe = Classe.objects.get(pk=pk)
                serializer = ClasseSerializer(classe)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Classe.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)


    def post(self, request):
        serializer = ClasseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        classes = Classe.objects.get(pk=pk)
        serializer = ClasseSerializer(classes, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        classes = Classe.objects.get(pk=pk)
        classes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
