from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('users/tok', obtain_auth_token, name='user-token'),
    path('users/signup',views. SignUp.as_view(), name='user-signup')
]