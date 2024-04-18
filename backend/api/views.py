from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.fields import CurrentUserDefault
from .serializers import UserSerializer, ClimbSerializer, SessionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Climb, Session
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


class SessionListCreate(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]
    print('session')

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(user=user) 

   

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
            raise serializer.errors


class SessionDetailsList(generics.ListCreateAPIView):
    serializer_class = ClimbSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sessionId = self.kwargs.get('id')
        return Climb.objects.filter(session=sessionId)
    



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