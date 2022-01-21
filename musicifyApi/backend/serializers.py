from django.db.models.base import Model
from rest_framework.serializers import ModelSerializer
from . import models

class SongSerializer(ModelSerializer):
    class Meta:
        model = models.Song
        fields = '__all__'

class RecentSongSerializer(ModelSerializer):
    class Meta:
        model = models.RecentSong
        fields = '__all__'

class AlbumSerializer(ModelSerializer):
    class Meta:
        model = models.Album
        fields = '__all__'

class AlbumSongSerializer(ModelSerializer):
    class Meta:
        model = models.AlbumSong
        fields = '__all__'