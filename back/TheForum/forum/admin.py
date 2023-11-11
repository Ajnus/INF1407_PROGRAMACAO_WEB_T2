from django.contrib import admin
# Register your models here.
from forum.models import Publicacao, Comentario
admin.site.register(Publicacao)
admin.site.register(Comentario)