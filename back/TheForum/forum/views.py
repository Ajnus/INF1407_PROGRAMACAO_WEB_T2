from django.shortcuts import render
from forum.serializers import PublicacaoSerializer
from rest_framework.views import APIView
from forum.models import Publicacao
from rest_framework.response import Response

class PublicacaoView(APIView):
    def get(self, request):
        queryset = Publicacao.objects.all().order_by('titulo')
        # importante informar que o queryset terá mais
        # de 1 resultado usando many=True
        serializer = PublicacaoSerializer(queryset, many=True)
        return Response(serializer.data)