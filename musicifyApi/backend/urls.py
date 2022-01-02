from django.urls import path
from .views import SongAudio, SongThumbnail, Songs

urlpatterns = [
    path('songs', Songs.as_view(), name='songs'),

    path('songs/thumb/<int:song_id>', SongThumbnail.as_view(), name='song-thumbnail'),
    path('songs/audio/<int:song_id>', SongAudio.as_view(), name='song-audio'),
]