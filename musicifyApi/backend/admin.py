from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Song)
admin.site.register(models.RecentSong)
admin.site.register(models.RatedSong)
admin.site.register(models.Album)
admin.site.register(models.AlbumSong)