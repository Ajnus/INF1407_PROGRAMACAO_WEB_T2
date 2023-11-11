from django.urls import path
from forum import views

app_name = 'forum'
urlpatterns = [
    
    path("lista/",views.PublicacaoView.as_view(),
    name = 'lista-pubs'
    ),
]