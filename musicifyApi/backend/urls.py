from django.urls import path
from .views import RecentSongs, SongAudio, SongThumbnail, Songs

urlpatterns = [
    path('songs', Songs.as_view(), name='songs'),

    path('songs/thumb/<int:song_id>', SongThumbnail.as_view(), name='get-song-thumbnail'),
    path('songs/audio/<int:song_id>', SongAudio.as_view(), name='get-song-audio'),

    path('songs/recents/get/<int:user_id>', RecentSongs.as_view(), name='get-recent-songs'),
    path('songs/recents/post/<int:user_id>/<int:song_id>', RecentSongs.as_view(), name='post-recent-songs')
]