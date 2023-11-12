from django.shortcuts import render
from forum.serializers import PublicacaoSerializer
from rest_framework.views import APIView
from forum.models import Publicacao
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class PublicacoesView(APIView):
    @swagger_auto_schema(
        operation_summary='Lista todas as publicacoes',
        operation_description="Obter informações sobre todas as publicacoes",
        request_body=None, # opcional
        responses={200: PublicacaoSerializer()}
    )
    def get(self, request):
        queryset = Publicacao.objects.all().order_by('titulo')
        # importante informar que o queryset terá mais
        # de 1 resultado usando many=True
        serializer = PublicacaoSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class PublicacaoCriaView(APIView):
    @swagger_auto_schema(
        operation_summary='Criar Pub', operation_description="Criar uma nova publicacao",
        request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
        'titulo': openapi.Schema(default='Como ganhar musculos em 10 dias', description='Titulo da Publicacao', type='string'),
        'texto': openapi.Schema(default=0, description='Texto  da Publicacao', type='string'),
        },
        ),
        responses={201: PublicacaoSerializer(), 400: 'Dados errados',},
    )
    def post(self, request):
        serializer = PublicacaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # uma boa prática é retornar o próprio objeto a
            return Response(serializer.data,
            status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status.HTTP_400_BAD_REQUEST)
                            
class PublicacaoView(APIView):
    def singleObj(self, id_arg, obj):
        try:
            queryset = obj.objects.get(id=id_arg)
            return queryset
        except obj.DoesNotExist: # id não existe
            return None

    # id_arg é o mesmo nome que colocamos em urls.py
    @swagger_auto_schema(
        operation_summary='Selecionar uma publicacao',
        operation_description="Obter informações sobre uma publicacao específica",
        responses={
        200: PublicacaoSerializer(),
        400: 'Mensagem de erro',
        },
        manual_parameters=[
                            openapi.Parameter('id_arg',openapi.IN_PATH,
                                            default=5,
                                            type=openapi.TYPE_INTEGER,
                                            required=True,
                                            description='id da publicacao na URL',
                                            ),
                        ],
    )
    def get(self, request, id_arg):
        queryset = self.singleObj(id_arg,Publicacao)
        if queryset:
            serializer = PublicacaoSerializer(queryset)
            return Response(serializer.data)
        else:
            # response for IDs that is not an existing pub
            return Response({
                            'msg': f'Publicacao com id #{id_arg} não existe'
                            }, status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary='Atualizar uma publicacao',
        operation_description="Atualizar informações sobre uma publicacao específica",
        responses={
        200: PublicacaoSerializer(),
        400: 'Mensagem de erro',
        },
        request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
        'titulo': openapi.Schema(default='Como ganhar musculos em 10 dias', description='Titulo da Publicacao', type='string'),
        'texto': openapi.Schema(default=0, description='Texto  da Publicacao', type='string'),
        },
        ),
        manual_parameters=[
                            openapi.Parameter('id_arg',openapi.IN_PATH,
                                            default=5,
                                            type=openapi.TYPE_INTEGER,
                                            required=True,
                                            description='id da publicacao na URL',
                                            ),
                        ],
        )
    def put(self, request, id_arg):
        pub = self.singleObj(id_arg,Publicacao)
        serializer = PublicacaoSerializer(pub,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary='Apagar uma publicacao',
        operation_description="Apagar uma publicacao específica",
        responses={
        204: 'Ok',
        400: 'Mensagem de erro',
        },
        manual_parameters=[
                            openapi.Parameter('id_arg',openapi.IN_PATH,
                                            default=5,
                                            type=openapi.TYPE_INTEGER,
                                            required=True,
                                            description='id da publicacao na URL',
                                            ),
                        ],
    )
    def delete(self, request,id_arg):
        pub = Publicacao.objects.get(id=id_arg)
        if pub:
            pub.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': f'item [{id_arg}] não encontrado'},status.HTTP_404_NOT_FOUND)
        