from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import cUser

ERR = status.HTTP_400_BAD_REQUEST
OK = status.HTTP_200_OK

# Create your views here.
class SignUp(APIView):
    def post(self, req):
        data = req.data['data']

        if(len(data['bandName']) < 1):
            data['bandName'] = None;

        try:
            user = cUser.objects.create(email=data['email'], password=data['password'], first_name=data['firstName'],
            last_name=data['lastName'], band_name=data['bandName'])

            token, created = Token.objects.get_or_create(user=user)
        except Exception as e:
            print(e)
            return Response({'detail': 'Something went wrong'}, ERR)

        return Response({'tok': token.key}, OK)