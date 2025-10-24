from django.template.context_processors import request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from note.models import Note, Bulletin
from note.serializer import NoteSerializer, BulletinSerializer


# Create your views here.
class NoteView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            notes = Note.objects.select_related().all()
            serializer = NoteSerializer(notes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            note = Note.objects.select_related().get(pk=pk)
            serializer = NoteSerializer(note)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        note = Note.objects.get(pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BulletinView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            bulletin = Bulletin.objects.select_related().all()
            serializer = BulletinSerializer(bulletin, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            bulletin = Bulletin.objects.select_related().get(pk=pk)
            serializer = BulletinSerializer(bulletin)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BulletinSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        note = Bulletin.objects.get(pk=pk)
        serializer = BulletinSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = Bulletin.objects.get(pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)