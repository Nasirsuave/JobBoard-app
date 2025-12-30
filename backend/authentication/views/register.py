from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework import status, generics

from ..serializers.register import (
    EmployeeRegisterSerializer,
    EmployerRegisterSerializer,
    AdminRegisterSerializer
)


class RegisterEmployeeView(generics.CreateAPIView):
    serializer_class = EmployeeRegisterSerializer


class RegisterEmployerView(generics.CreateAPIView):
    serializer_class = EmployerRegisterSerializer

class RegisterAdminView(generics.CreateAPIView):
    serializer_class = AdminRegisterSerializer