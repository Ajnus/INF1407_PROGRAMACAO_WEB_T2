from rest_framework import serializers
from forum.models import Publicacao, Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario # nome do modelo
        fields = ['id', 'texto','idPublicacao']
        read_only_fields = ['id']

class PublicacaoSerializer(serializers.ModelSerializer):
    comentarios = ComentarioSerializer(many=True, read_only=True)
    class Meta:
        model = Publicacao # nome do modelo
        fields = ['id', 'titulo', 'texto','comentarios']
        read_only_fields = ['id']

