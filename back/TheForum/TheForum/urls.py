"""TheForum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
#from app import views
from django.urls import path
from django.urls.conf import include
from django.urls import include
from django.contrib.auth.views import LoginView
from django.urls.base import reverse_lazy
from django.contrib.auth.views import LogoutView
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.views import PasswordChangeDoneView
from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
#from app.views import AppUpdateView
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView
from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetCompleteView
from drf_yasg.views import get_schema_view as yasg_schema_view
from rest_framework.schemas import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions,routers
from rest_framework.documentation import include_docs_urls


schema_view = yasg_schema_view(
    openapi.Info(
    title="API de Exemplo",
    default_version='v1',
    description="Descrição da API de exemplo",
    contact=openapi.Contact(email="dbdoof@gmail.com"),
    license=openapi.License(name='GNU GPLv3'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('api_schema', get_schema_view(title="API para Forum",description="API para obter dados do forum"),name='api_schema'),
    path('docs/',
        include_docs_urls(title='TheForum: Documentação da API')),
    path('swagger/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'),
    path('api/v1/',
         include(routers.DefaultRouter().urls)),
    #path('/'),
    path('admin/', admin.site.urls),
    path("forum/", include('forum.urls')),
    path("accounts/", include('accounts.urls')),
]
