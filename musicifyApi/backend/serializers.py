from rest_framework.serializers import ModelSerializer
from . import models

class SongSerializer(ModelSerializer):
    class Meta:
        model = models.Song
        fields = '__all__'