from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import Song, RecentSong
from .serializers import SongSerializer
from users.models import cUser

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
        if song_id is not None:
            thumbnail = Song.objects.get(id=song_id).thumbnail

            if thumbnail is not None:
                return FileResponse(thumbnail)
        return Response({'400': f'Song with id of {song_id} is None'}, ERR)

class SongAudio(APIView):
    def get(self, req, song_id):
        if song_id is not None:
            song = Song.objects.get(id=song_id)
            song.views += 1
            song.save()

            if song is not None:
                return FileResponse(song.audio)
        return Response({'400': f'Song with id of {song_id} is None'}, ERR)

class RecentSongs(APIView):
    def get(self, req, user_id):
        user = cUser.objects.get(id=user_id)
        recent_songs = RecentSong.objects.filter(user=user)
        songs = [Song.objects.get(id=x.id) for x in recent_songs]

        serializer = SongSerializer(songs, many=True).data
        return Response({'data': serializer}, OK)

    def post(self, req, user_id, song_id):
        user = cUser.objects.get(id=user_id)
        song = Song.objects.get(id=song_id)
        recent_songs = RecentSong.objects.filter(user=user)

        if not recent_songs.filter(song_id=song.id).exists():
            RecentSong.objects.create(user=user, song_id=song_id)
            return Response({'data': f'Added song {song.title} for user {user.producer_name}'})

        else:
            return Response({'data': f'Updated song {song.title} for user {user.producer_name}'})

