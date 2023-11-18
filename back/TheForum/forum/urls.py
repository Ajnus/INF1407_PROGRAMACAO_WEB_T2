from django.urls import path
from forum import views

app_name = 'forum'
urlpatterns = [
    
    path("pub/lista/",views.PublicacoesView.as_view(),name = 'lista-pubs'),
    path('pub/cria/', views.PublicacaoCriaView.as_view(), name='pub-cria'),
    path('pub/<id_arg>/', views.PublicacaoView.as_view(), name='consulta-pub'),
    path('com/cria/', views.ComentarioCriaView.as_view(), name='comentario-cria'),
    path('com/<id_arg>/', views.ComentarioView.as_view(), name='apaga-com'),
]