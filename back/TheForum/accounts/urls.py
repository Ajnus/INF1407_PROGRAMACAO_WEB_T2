from django.urls import path
from accounts import views

app_name = 'accounts'
urlpatterns = [
        path('token-auth/', views.CustomAuthToken.as_view(), name='token-auth'),
            path('create-user/', views.CreateUserView.as_view(), name='create-user'),
]