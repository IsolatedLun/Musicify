from django.db import models

from .validators import validate_extension

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=64)
    author = models.CharField(max_length=64)

    views = models.PositiveBigIntegerField(default=0)
    rating = models.PositiveIntegerField(default=1)

    thumbnail = models.ImageField(upload_to='thumbnails/')

    audio = models.FileField(upload_to='audios/', 
        validators=[lambda x: validate_extension(x, ['.mp3', '.wav'], 'audio')])

    created_at = models.DateTimeField(auto_now_add=True)