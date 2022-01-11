from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('users/login', views.Login.as_view(), name='post-user-token'),
    path('users/signup', views.SignUp.as_view(), name='post-user-signup'),

    path('users/tok/<str:tok>', views.UserWithToken().as_view(), name='get-user-by-token'),
    path('users/update', views.UpdateUser.as_view(), name='post-update-user'),

    path('users/profiles/<int:user_id>', views.UserProfile.as_view(), name='get-user-profile'),
]