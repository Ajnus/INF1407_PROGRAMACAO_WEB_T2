from django.shortcuts import render
from forum.serializers import PublicacaoSerializer
from rest_framework.views import APIView
from forum.models import Publicacao
from rest_framework.response import Response
from rest_framework import status


class PublicacoesView(APIView):
    def get(self, request):
        queryset = Publicacao.objects.all().order_by('titulo')
        # importante informar que o queryset terá mais
        # de 1 resultado usando many=True
        serializer = PublicacaoSerializer(queryset, many=True)
        return Response(serializer.data)



class PublicacaoView(APIView):
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

    def singleObj(self, id_arg, obj):
        try:
            queryset = obj.objects.get(id=id_arg)
            return queryset
        except obj.DoesNotExist: # id não existe
            return None

    # id_arg é o mesmo nome que colocamos em urls.py
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
        
    def put(self, request, id_arg):
        pub = self.singleObj(id_arg,Publicacao)
        serializer = PublicacaoSerializer(pub,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status.HTTP_400_BAD_REQUEST)