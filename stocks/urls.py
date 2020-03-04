from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('api/', include('stocksbackend.urls')),
    path('token-auth/', obtain_jwt_token),
]
