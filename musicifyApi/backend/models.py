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

class Song(models.Model):
    title = models.CharField(max_length=64, unique=True)
    author = models.CharField(max_length=64, unique=True)
    genre = models.CharField(max_length=32, choices=genres_choices, default='All')

    views = models.PositiveBigIntegerField(default=0)
    rating = models.PositiveIntegerField(default=1)

    thumbnail = models.ImageField(upload_to='thumbnails/')

    audio = models.FileField(upload_to='audios/', 
        validators=[])

    created_at = models.DateTimeField(auto_now_add=True)

class RecentSong(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song_id = models.PositiveBigIntegerField()

class Album(models.Model):
    name = models.CharField(max_length=64, unique=True)
    published = models.BooleanField(default=False)

    views = models.PositiveBigIntegerField(default=0)
    thumbnail = models.ImageField(upload_to='thumbnails/albums/')

    songs = models.ForeignKey(Song, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(auto_now_add=False)