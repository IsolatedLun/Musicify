from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.forms import UserCreationForm

from . import models

class cUserSerializer(ModelSerializer):
    class Meta:
        model = models.cUser
        fields = '__all__'

        password = CharField(min_length=7, write_only=True, required=True)
    
class UserForm(UserCreationForm):

    class Meta:
        model = models.cUser
        fields = ['email']