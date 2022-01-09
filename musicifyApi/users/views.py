from django.core.exceptions import ObjectDoesNotExist
from django.http.response import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import cUser
from .serializers import cUserSerializer

ERR = status.HTTP_400_BAD_REQUEST
OK = status.HTTP_200_OK

# Create your views here.
class SignUp(APIView):
    def post(self, req):
        data = req.data['data']

        if(len(data['producerName']) < 1):
            data['bandName'] = None;

        try:
            user = cUser.objects.create(email=data['email'], password=data['password'], first_name=data['firstName'],
            last_name=data['lastName'], band_name=data['producerName'])

            token, created = Token.objects.get_or_create(user=user)
        except Exception as e:
            return Response({'detail': 'Something went wrong'}, ERR)

        return Response({'tok': token.key}, OK)

class Login(APIView):
    def post(self, req):
        email = req.data.get('email', None)
        password = req.data.get('password', None)

        if email is not None and password is not None:
            try:
                user = cUser.objects.get(email=email)
                if cUser.check_password(password):
                    serializer = cUserSerializer(user).data
                    token = Token.objects.get(user=user).key

                    return Response({'user': serializer, 'tok': token}, OK)
                else:
                    raise ObjectDoesNotExist('User does not exist')

            except ObjectDoesNotExist:
                return Response({'err': 'User does not exist'}, ERR)
        return Response({'err': f'Invalid email or password'}, ERR)

class UserProfile(APIView):
    def get(self, req, user_id):
        profile = cUser.objects.get(id=user_id).profile
        return FileResponse(profile)

class UserWithToken(APIView):
    def get(self, req, tok):
        try:
            user = Token.objects.get(key=tok).user
            serializer = cUserSerializer(user).data

            return Response({'user': serializer}, OK)
        except:
            return Response({'err': 'User with this token does not exist.'}, ERR)