from django.http import FileResponse
from .views import ERR, OK, Response, FileResponse, APIView
from .models import Album, AlbumSong, Song
from .serializers import AlbumSerializer, AlbumSongSerializer, SongSerializer
from users.utils import get_user_by_tok

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

        new_album = Album.objects.create(name=data['album_name'], user=user, profile=data['profile'])
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
        songs = [Song.objects.get(id=x.song.id) for x in album_songs]

        serializer = SongSerializer(songs, many=True).data

        return Response(serializer, OK)

    def post(self, req, album_id):
        data = req.data

        song = Song.objects.get(id=data['song_id']['data'])
        album_song = AlbumSong.objects.create(song=song, album_id=album_id)

        return Response({'detail': 'Added song to album'}, OK)


class AlbumProfieView(APIView):
    def get(self, req, album_id):
        album = Album.objects.get(id=album_id)

        return FileResponse(album.profile)