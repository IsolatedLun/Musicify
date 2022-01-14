from rest_framework.serializers import ModelSerializer, CharField

from . import models

class cUserSerializer(ModelSerializer):
    class Meta:
        model = models.cUser
        fields = ['id', 'email', 'first_name', 'last_name', 'producer_name', 'profile']

        password = CharField(min_length=7, write_only=True, required=True)