from django.urls import path
from .views import RecentSongs, SongAudio, SongThumbnail, Songs, UploadSong

urlpatterns = [
    path('songs', Songs.as_view(), name='songs'),

    path('songs/thumb/<int:song_id>', SongThumbnail.as_view(), name='get-song-thumbnail'),
    path('songs/audio/<int:song_id>', SongAudio.as_view(), name='get-song-audio'),

    path('songs/recents/get', RecentSongs.as_view(), name='get-recent-songs'),
    path('songs/recents/post', RecentSongs.as_view(), name='post-recent-songs'),

    path('songs/upload', UploadSong.as_view(), name='post-upload-song')
]