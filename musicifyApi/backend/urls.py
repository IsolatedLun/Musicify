from django.urls import path
from .views import Songs

urlpatterns = [
    path('songs', Songs.as_view(), name='songs')
]