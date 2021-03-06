from django.urls import path

from . import views
from . import albumViews

urlpatterns = [
    path('songs', views.Songs.as_view(), name='songs'),
    path('delete/<int:item_id>', views.DeleteItem.as_view(), name='post-delete-item'),

    path('songs/thumb/<int:song_id>', views.SongThumbnail.as_view(), name='get-song-thumbnail'),
    path('songs/audio/<int:song_id>', views.SongAudio.as_view(), name='get-song-audio'),

    path('songs/recents/get', views.RecentSongs.as_view(), name='get-recent-songs'),
    path('songs/recents/post/<int:song_id>', views.RecentSongs.as_view(), name='post-recent-songs'),

    path('songs/upload', views.UploadSong.as_view(), name='post-upload-song'),
    path('songs/uploads/user', views.UploadedSong.as_view(), name='get-uploaded-song'),

    path('songs/rating/<int:song_id>', views.RatedSongView.as_view(), name='handle-liked-song'),

    # Albums
    path('albums', albumViews.AlbumView.as_view(), name='get-albums'),
    path('albums/songs/<int:album_id>', albumViews.AlbumSongView.as_view(), name='get-album-songs'),
    path('albums/create', albumViews.CreateAlbumView.as_view(), name='post-create-album'),
    path('albums/profiles/<int:album_id>', albumViews.AlbumProfieView.as_view(), name='get-album-profile')
]