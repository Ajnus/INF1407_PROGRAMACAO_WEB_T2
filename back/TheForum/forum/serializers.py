from rest_framework import serializers
from forum.models import Publicacao, Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    autor_username = serializers.ReadOnlyField(source='autor.username')
    class Meta:
        model = Comentario # nome do modelo
        fields = ['id', 'texto','idPublicacao','autor','autor_username']
        read_only_fields = ['id']

class PublicacaoSerializer(serializers.ModelSerializer):
    comentarios = ComentarioSerializer(many=True, read_only=True)
    autor_username = serializers.ReadOnlyField(source='autor.username')
    class Meta:
        model = Publicacao # nome do modelo
        fields = ['id', 'titulo', 'texto','comentarios','autor','autor_username']
        read_only_fields = ['id']

