from django.http.response import FileResponse
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

    def get(self, req, song_id=None):
        songs = Song.objects.all();
        return Response(self.serializer(songs, many=True).data, OK)

class SongThumbnail(APIView):
    def get(self, req, song_id):
        thumbnail = Song.objects.get(id=song_id).thumbnail

        if thumbnail is not None:
            return FileResponse(thumbnail)
        return Response({'400': f'Song with id of {song_id} is None'}, ERR)

class SongAudio(APIView):
    def get(self, req, song_id):
        song = Song.objects.get(id=song_id)
        song.views += 1
        song.save()

        if song is not None:
            return FileResponse(song.audio)
        return Response({'400': f'Song with id of {song_id} is None'}, ERR)