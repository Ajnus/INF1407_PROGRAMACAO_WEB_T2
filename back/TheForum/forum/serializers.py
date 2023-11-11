from rest_framework import serializers
from forum.models import Publicacao, Comentario

class PublicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacao # nome do modelo
        fields = '__all__' # lista de campos


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario # nome do modelo
        fields = '__all__' # lista de campos