from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ClimbSerializer, SessionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Climb, Session


class SessionListCreate(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
            raise serializer.errors


class ClimbListCreate(generics.ListCreateAPIView):
    serializer_class = ClimbSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Climb.objects.filter(climber=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(climber=self.request.user)
        else:
            print(serializer.errors)
            raise serializer.errors


class ClimbDelete(generics.DestroyAPIView):
    serializer_class = ClimbSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Climb.objects.filter(Climber=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]