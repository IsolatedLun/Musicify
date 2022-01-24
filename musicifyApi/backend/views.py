from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from django.db.utils import IntegrityError
from sqlalchemy import except_

from users.utils import get_user_by_tok

from .utils import prettify

from .models import Album, AlbumSong, RatedSong, Song, RecentSong
from .serializers import AlbumSerializer, AlbumSongSerializer, SongSerializer
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
        try:
            thumbnail = Song.objects.get(id=song_id).thumbnail
            return FileResponse(thumbnail)
        except Song.DoesNotExist:
            return Response({'err': f'Song with id of {song_id} does not exist'}, ERR)

class SongAudio(APIView):
    def get(self, req, song_id):
        try:
            song = Song.objects.get(id=song_id)
            song.views += 1
            song.save()
            return FileResponse(song.audio)
        except Song.DoesNotExist:
            return Response({'err': f'Song with id of {song_id} is None'}, ERR)

class RecentSongs(APIView):
    def get(self, req):
        try:
            user = get_user_by_tok(req.headers['authorization'])
            recent_songs = RecentSong.objects.filter(user=user).order_by('-listened_at')
            songs = []

            
            for x in recent_songs:
                songs.append(Song.objects.get(id=x.song_id))

            serializer = SongSerializer(songs, many=True).data
            
            return Response({"recents": serializer, 'favorites': []}, OK)
            
        except Song.DoesNotExist:
            return Response({'err': 'User has no recent songs'}, ERR)

    def post(self, req, song_id):
        if(song_id == 'null'):
            return Response({'detail': 'null'}, OK)

        user = get_user_by_tok(req.headers['authorization'])

        obj, created = RecentSong.objects.update_or_create(user=user, song_id=song_id, 
            defaults={'listened_at': datetime.now()})

        if created:
            return Response({'detail': f'Created song id="{song_id}" for user id="{user.id}"'}, OK)
        else:
            return Response({'detail': f'Updated song id="{song_id}" for user id="{user.id}"'}, OK)



class UploadSong(APIView):
    def post(self, req):
        data = req.data
        user = get_user_by_tok(req.headers['authorization'])

        try:
            new_song, created = Song.objects.get_or_create(title=data['title'], 
                user=user, duration=data['duration'], thumbnail=data['profile'], genre=data['genre'], 
                author=user.producer_name, audio=data['audio'])
            
            if not created:
                return Response({'err': 'Song already exists.'}, ERR)

            return Response({'data': new_song.id}, OK)

        except KeyError as e:
            return Response({'err': f'A {prettify(e, True)} is required.'}, ERR)
        except IntegrityError as e:
            return Response({'err': f'The same {prettify(e, False)} already exists.'}, ERR)
        except Exception as e:
            return Response({'err': f'Something went wrong.'}, ERR)

class UploadedSong(APIView):
    def get(self, req):
        try:
            user = get_user_by_tok(req.headers['authorization'])
            songs = Song.objects.filter(user_id=user.id)
            serializer = SongSerializer(songs, many=True).data

            return Response({'data': serializer}, OK)
        except:
            return Response({'err': 'Couldn\'t fetch songs.'}, ERR)

class RatedSongView(APIView):
    def get(self, req, song_id):
        song = Song.objects.get(id=song_id)
        res = {'rating': self.calculate_song_rating(song.likes, song.dislikes)}

        user = get_user_by_tok(req.headers['authorization'])
        rated_song = RatedSong.objects.filter(user_id=user.id, song_id=song_id)

        if(rated_song.exists()):
            res['is_rated'] = True
            res['rate_type'] = rated_song[0].rate_type
            return Response(res, OK)
            
        res['is_rated'] = False
        return Response(res, OK)

    def post(self, req, song_id):
        user = get_user_by_tok(req.headers['authorization'])
        rate_type = req.data.get('rate_type', None)
        rated_song, created = RatedSong.objects.get_or_create(user=user, song_id=song_id)
        song = Song.objects.get(id=song_id)

        if created:
            return self.rate_song(song, rated_song, rate_type)
        
        elif rated_song.rate_type != rate_type:
           return self.swap_rate_song(song, rated_song, rate_type)

        else:
            return Response({'err': 'Rated song already exists.'}, ERR)

    def rate_song(self, song, rated_song, rate_type, alter_type='Added'):
        if rate_type == 'like':
            song.likes += 1
            rated_song.rate_type = 'like'
            rated_song.save()
            song.save()

            return Response({'detail': f'{alter_type} liked song.'}, OK)
        elif rate_type == 'dislike':
            song.dislikes += 1
            rated_song.rate_type = 'dislike'
            rated_song.save()
            song.save()

            return Response({'detail': f'{alter_type} disliked song.'}, OK)

    def swap_rate_song(self, song, rated_song, rate_type):
        if rate_type == 'like':
            song.dislikes -= 1 if song.dislikes > 0 else 0

        elif rate_type == 'dislike':
            song.likes -= 1 if song.likes > 0 else 0

        return self.rate_song(song, rated_song, rate_type, 'Updated')

    def calculate_song_rating(self, likes, dislikes):
        if likes == 0 and dislikes == 0:
            return 50

        return (likes / (likes + dislikes)) * 100

class DeleteItem(APIView):
    def post(self, req, item_id):
        itemtype = req.data['type']
        to_delete = None

        if itemtype == 'song':
            to_delete = Song.objects.get(id=item_id)
        elif itemtype == 'album':
            to_delete = Album.objects.get(id=item_id)
            to_delete_children = AlbumSong.objects.filter(album_id=item_id)

            for x in to_delete_children:
                Song.objects.get(id=x.song.id).delete()
        
        if to_delete is not None:
            to_delete.delete()
            return Response({'detail': 'Item deleted'}, OK)
        return Response({'err': 'Item does not exist'}, ERR)