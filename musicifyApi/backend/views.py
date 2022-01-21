from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from django.db.utils import IntegrityError

from users.utils import get_user_by_tok

from .utils import prettify

from .models import Album, AlbumSong, RatedSong, Song, RecentSong
from .serializers import AlbumSerializer, SongSerializer
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
    def get(self, req):
        try:
            user = get_user_by_tok(req.headers['authorization'])
            recent_songs = RecentSong.objects.filter(user=user).order_by('-listened_at')
            songs = [Song.objects.get(id=x.song_id) for x in recent_songs]

            serializer = SongSerializer(songs, many=True).data
            
            return Response({"recents": serializer, 'favorites': []}, OK)
            
        except Song.DoesNotExist:
            return Response({'err': 'User has no recent songs'}, ERR)
        except cUser.DoesNotExist:
            return Response({'err': 'User does not exist.'}, ERR)

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
            new_song, created = Song.objects.get_or_create(title=data['title'], user=user,
                thumbnail=data['profile'], genre=data['genre'], author=user.producer_name, audio=data['audio'])
            
            if not created:
                return Response({'err': 'Song already exists.'}, ERR)

            return Response({'detail': 'Song uploaded.'}, OK)

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
            self.rate_song(song, rated_song, rate_type)
        
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
        if likes == 0:
            likes = 1
        if dislikes == 0:
            dislikes = 1

        return (likes / (likes + dislikes)) * 100

# ===================
# Album views
# ===================
class AlbumView(APIView):
    def get(self, req):
        tok = req.headers.get('authorization', None)
        if not tok:
            albums = Album.objects.all()
        else:
            user = get_user_by_tok(tok)
            albums = Album.objects.filter(user=user)
            
        serializer = AlbumSerializer(albums, many=True).data
        return Response(serializer, OK)


class CreateAlbumView(APIView):
    def post(self, req):
        data = req.data
        user = get_user_by_tok(req.headers['authorization'])

        new_album = Album.objects.create(name=data['album_name'], user=user, thumbnail=data['profile'])
        return Response({'detail': f'Album {new_album.name} created.'}, OK)

    def get(self, req):
        try:
            album = Album.objects.get(id=req.data['album_id'])
            serializer = AlbumSerializer(album).data
            return Response(serializer, OK)
        except:
            return Response({'err': 'Album does not exist'}, ERR)

class AlbumSongView(APIView):
    def get(self, req, album_id):
        album_songs = AlbumSong.objects.filter(album_id=album_id)
        serializer = AlbumSerializer(album_songs, many=True).data

        return Response(serializer, OK)

class AlbumProfieView(APIView):
    def get(self, req, album_id):
        album = Album.objects.get(id=album_id)

        return FileResponse(album.profile)
