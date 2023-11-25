from rest_framework.response import Response
from rest_framework import status,generics
# Autenticação
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
# Swagger
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from accounts.serializers import CreateUserSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import authentication_classes

@permission_classes([AllowAny])
class CreateUserView(APIView):
    @swagger_auto_schema(
        operation_summary='Criar um novo usuário',
        operation_description='Retorna o token em caso de sucesso na criação do usuário',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                # Adicione outros campos necessários para a criação do usuário
            },
            required=['username', 'password', 'email'],
        ),
        responses={
            status.HTTP_201_CREATED: 'Usuário criado com sucesso.',
            status.HTTP_400_BAD_REQUEST: 'Erro na requisição.',
        },
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # uma boa prática é retornar o próprio objeto a
            return Response(serializer.data,
            status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status.HTTP_400_BAD_REQUEST)   


class CustomAuthToken(ObtainAuthToken):
    @swagger_auto_schema(
        operation_summary='Obter o token de autenticação',
        operation_description='Retorna o token em caso de sucesso na autenticação ou HTTP 401',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['username', 'password', ],
        ),
        responses={
            status.HTTP_200_OK: 'Token is returned.',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized request.',
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print("entrei")
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')

            if username is not None and password is not None:
                user = authenticate(request, username=username, password=password)
                
                if user is not None:
                    # Token generation
                    token, _ = Token.objects.get_or_create(user=user)
                    login(request, user)
                    
                    # Log or print the token for debugging
                    print("Token:", token.key)
                    
                    return Response({'token': token.key})
        print("tchau")
        print(serializer.errors)
        return Response({'non_field_errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary='Obtém o username do usuário',
        operation_description="Retorna o username do usuário ou apenas visitante se o usuário não for cadastrado",
        security=[{'Token':[]}],
        manual_parameters=[
            openapi.Parameter(
        '       Authorization',
                openapi.IN_HEADER,
                type=openapi.TYPE_STRING,
                description='Token de autenticação no formato "token \<<i>valor do token</i>\>"',
                default='token ',
            ),
        ],
        responses={
            200: openapi.Response(
                description='Nome do usuário',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={'username': openapi.Schema(type=openapi.TYPE_STRING)},
                ),
            )
        }
    )
    def get(self, request):
        '''
        Parâmetros: o token de acesso
        Retorna: o username ou 'visitante'
        '''
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[0] # token
            
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            return Response(
                {'username': user.username},
                status=status.HTTP_200_OK)
        except (Token.DoesNotExist, AttributeError):
            return Response(
                {'username': 'visitante'},
                status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description='Realiza logout do usuário, apagando o seu token',
        operation_summary='Realiza logout',
        security=[{'Token':[]}],
        manual_parameters=[
        openapi.Parameter('Authorization', openapi.IN_HEADER,
        type=openapi.TYPE_STRING, default='token ',
        description='Token de autenticação no formato "token \<<i>valor do token</i>\>"',
        ),
        ],
        request_body=None,
        responses={
        status.HTTP_200_OK: 'User logged out',
        status.HTTP_400_BAD_REQUEST: 'Bad request',
        status.HTTP_401_UNAUTHORIZED: 'User not authenticated',
        status.HTTP_403_FORBIDDEN: 'User not authorized to logout',
        status.HTTP_500_INTERNAL_SERVER_ERROR: 'Erro no servidor',
        },
    )
    def delete(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token_obj = Token.objects.get(key=token)
        except (Token.DoesNotExist, IndexError):
            return Response({'msg': 'Token não existe.'}, status=status.HTTP_400_BAD_REQUEST)
        user = token_obj.user
        if user.is_authenticated:
            request.user = user
            logout(request)
            token = Token.objects.get(user=user)
            token.delete()
            return Response({'msg': 'Logout bem-sucedido.'},
            status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Usuário não autenticado.'},
            status=status.HTTP_403_FORBIDDEN)