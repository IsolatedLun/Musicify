from django.core.exceptions import ValidationError
from django.db import models
from users.models import cUser

def callback(extensions, ext_needed):
    def validate_extension(file):
            import os

            f_ext = os.path.splitext(file.name)[1]

            if f_ext not in extensions:
                raise ValidationError(f'Not a valid {f_ext.capitalize()} file.')
            return file

    return validate_extension

genres_choices = [
    ('all', 'All'),
    ('pop', 'Pop'),
    ('instrumental', 'Instrumental'),
    ('rock', 'Rock'),
    ('rap', 'Rap'),
    ('metal', 'Metal'),
    ('jazz', 'Jazz'),
]

rate_choices = [
    ('like', 'like'),
    ('dislike', 'dislike'),
]

class Song(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, unique=True)
    genre = models.CharField(max_length=32, choices=genres_choices, default='All')
    author = models.CharField(max_length=64)

    views = models.PositiveBigIntegerField(default=0)
    rating = models.PositiveIntegerField(default=1)
    likes = models.PositiveIntegerField(default=1)
    dislikes = models.PositiveIntegerField(default=1)

    thumbnail = models.ImageField(upload_to='thumbnails/')
    duration = models.CharField(max_length=16, default='00:00:00')

    audio = models.FileField(upload_to='audios/', 
        validators=[])

    created_at = models.DateTimeField(auto_now_add=True)

class RecentSong(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song_id = models.PositiveBigIntegerField()
    listened_at = models.DateTimeField(auto_now_add=True)

class RatedSong(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song_id = models.PositiveBigIntegerField()
    rate_type = models.CharField(max_length=32, choices=rate_choices)

class Album(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, unique=True)
    published = models.BooleanField(default=False)

    views = models.PositiveBigIntegerField(default=0)
    profile = models.ImageField(upload_to='thumbnails/albums/')

    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(auto_now_add=True)

class AlbumSong(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)