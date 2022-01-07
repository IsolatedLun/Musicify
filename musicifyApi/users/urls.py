from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from musicifyApi.users.views import SignUp

urlpatterns = [
    path('users/tok', obtain_auth_token, name='user-token-creation'),
    path('users/signup', SignUp.as_view(), name='user-signup')
]