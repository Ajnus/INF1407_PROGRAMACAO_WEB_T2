from django.db import models
from django.contrib.auth.models import User

class Publicacao(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(
    max_length=100, help_text='Entre com o título:')
    texto = models.CharField(
    max_length=10000, help_text='Digite o texto da publicação:')
    autor = models.ForeignKey(User, on_delete=models.CASCADE,default=None, null=True)
    data_publicacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.titulo


class Comentario(models.Model):
    id = models.AutoField(primary_key=True)
    texto = models.CharField(
    max_length=100, help_text='Digite o comentário:')
    idPublicacao  = models.ForeignKey(Publicacao,on_delete=models.CASCADE)
    autor = models.ForeignKey(User, on_delete=models.CASCADE,default=None, null=True)
    data_publicacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.texto

