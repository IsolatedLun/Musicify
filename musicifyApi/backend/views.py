from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import Song, RecentSong
from .serializers import SongSerializer
from users.models import cUser
from datetime import date, datetime

ERR = status.HTTP_400_BAD_REQUEST
OK = status.HTTP_200_OK

class Songs(APIView):
    serializer = SongSerializer

    def get(self, req, song_id=None):
        songs = Song.objects.all();
        return Response(self.serializer(songs, many=True).data, OK)

class SongThumbnail(APIView):
    def get(self, req, song_id):
        if song_id > -1:
            try:
                thumbnail = Song.objects.get(id=song_id).thumbnail
                return FileResponse(thumbnail)
            except Song.DoesNotExist:
                return Response({'err': f'Song with id of {song_id} does not exist'}, ERR)
        return Response({'err': f'Song id is None'}, ERR)

class SongAudio(APIView):
    def get(self, req, song_id):
        if song_id > -1:
            try:
                song = Song.objects.get(id=song_id)
                song.views += 1
                song.save()
                return FileResponse(song.audio)
            except Song.DoesNotExist:
                return Response({'err': f'Song with id of {song_id} is None'}, ERR)
        return Response({'err': f'Song id is None'}, ERR)

class RecentSongs(APIView):
    def get(self, req, user_id):
        try:
            user = cUser.objects.get(id=user_id)
            recent_songs = RecentSong.objects.filter(user=user).order_by('-listened_at')
            songs = [Song.objects.get(id=x.id) for x in recent_songs]

            serializer = SongSerializer(songs, many=True).data
            return Response({'data': serializer}, OK)

        except cUser.DoesNotExist:
            return Response({'err': 'User does not exist.'}, ERR)

    def post(self, req, user_id, song_id):
        user = cUser.objects.get(id=user_id)

        obj, created = RecentSong.objects.update_or_create(user=user, song_id=song_id, 
            defaults={'listened_at': datetime.now()})

        if created:
            return Response({'detail': f'Created song id="{song_id}" for user id="{user_id}"'}, OK)
        else:
            return Response({'detail': f'Updated song id="{song_id}" for user id="{user_id}"'}, OK)

