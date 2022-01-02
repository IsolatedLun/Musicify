from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import Song
from .serializers import SongSerializer

ERR = status.HTTP_400_BAD_REQUEST
OK = status.HTTP_200_OK

# Create your views here.
class Songs(APIView):
    serializer = SongSerializer

    def get(self, req):
        songs = Song.objects.all();

        return Response(self.serializer(songs, many=True).data, OK)

    def post(self, req):
        pass