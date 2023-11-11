from django.urls import path
from forum import views

app_name = 'forum'
urlpatterns = [
    
    path("pub/lista/",views.PublicacoesView.as_view(),name = 'lista-pubs'),
    path('pub/cria', views.PublicacaoView.as_view(), name='pub-cria'),
    path('pub/<id_arg>/', views.PublicacaoView.as_view(), name='consulta-pub'),
]