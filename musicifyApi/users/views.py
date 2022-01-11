from django.core.exceptions import ObjectDoesNotExist
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.utils import IntegrityError
from django.http.response import FileResponse, Http404
from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import cUser
from .serializers import cUserSerializer
from django.contrib.auth.hashers import make_password, check_password

ERR = status.HTTP_400_BAD_REQUEST
OK = status.HTTP_200_OK

def update_profile(user, profile):
    if isinstance(profile, InMemoryUploadedFile):
            user.profile = profile
            user.save()

# Create your views here.
class SignUp(APIView):
    def post(self, req):
        req.data._mutable = True
        data = req.data

        if(len(data['producerName']) < 1):
            data['producerName'] = None;

        try:
            user = cUser.objects.create(email=data['email'], password=make_password(data['password']), 
                first_name=data['firstName'], last_name=data['lastName'], producer_name=data['producerName'])
            
            update_profile(user, data['profilePicture'])

            Token.objects.create(user=user)

        except IntegrityError as e:
            field = str(e).split('.')[1].replace('_', ' ')
            return Response({'err': f'An account with this {field} already exists.'}, ERR)
        return Response({'detail': 'Account created'}, OK)

class Login(APIView):
    def post(self, req):
        email = req.data.get('email', None)
        password = req.data.get('password', None)

        if email and password:
            try:
                user = cUser.objects.get(email=email)
                
                if check_password(password, user.password):
                    serializer = cUserSerializer(user).data
                    token = Token.objects.get(user=user).key

                    return Response({'user': serializer, 'tok': token}, OK)
                else:
                    raise ValueError('Wrong password.')

            except ValueError as e:
                return Response({'err': f'{e}'}, ERR)
            except ObjectDoesNotExist:
                return Response({'err': 'Invalid email.'}, ERR)
        return Response({'err': f'Invalid email or password.'}, ERR)

class UpdateUser(APIView):
    def post(self, req, user_id):
        data = req.data

        if data:
            user = cUser.objects.get(id=user_id)
            user.first_name = data['firstName']
            user.last_name = data['lastName']
            user.producer_name = data['producerName']

            update_profile(user, data['profilePicture'])

        return Response({'detail': 'Account updated'}, OK)

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