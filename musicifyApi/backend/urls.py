from django.urls import path

from .views import CreateAlbumView, RatedSongView, RecentSongs, SongAudio, SongThumbnail, Songs, UploadSong, UploadedSong

urlpatterns = [
    path('songs', Songs.as_view(), name='songs'),

    path('songs/thumb/<int:song_id>', SongThumbnail.as_view(), name='get-song-thumbnail'),
    path('songs/audio/<int:song_id>', SongAudio.as_view(), name='get-song-audio'),

    path('songs/recents/get', RecentSongs.as_view(), name='get-recent-songs'),
    path('songs/recents/post/<int:song_id>', RecentSongs.as_view(), name='post-recent-songs'),

    path('songs/upload', UploadSong.as_view(), name='post-upload-song'),
    path('songs/uploads/user', UploadedSong.as_view(), name='get-uploaded-song'),

    path('songs/rating/<int:song_id>', RatedSongView.as_view(), name='handle-liked-song'),

    # Albums
    path('albums', CreateAlbumView.as_view(), name='post-create-album')
]