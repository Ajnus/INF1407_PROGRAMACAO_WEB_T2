from django.shortcuts import render
from forum.serializers import PublicacaoSerializer
from rest_framework.views import APIView
from forum.models import Publicacao
from rest_framework.response import Response
from rest_framework import status

class PublicacaoView(APIView):
    def get(self, request):
        queryset = Publicacao.objects.all().order_by('titulo')
        # importante informar que o queryset terá mais
        # de 1 resultado usando many=True
        serializer = PublicacaoSerializer(queryset, many=True)
        return Response(serializer.data)
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