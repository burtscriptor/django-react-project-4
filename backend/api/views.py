from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ClimbSerializer, SessionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Climb, Session
from rest_framework.decorators import api_view, permission_classes



class SessionListCreate(generics.ListCreateAPIView):
    serializer_class = SessionSerializer # A request arrives at the view then gets passed to the appropiate serializer before returning the serialized data
    permission_classes = [IsAuthenticated] # Filters uses by only allowing Authenicated Users, JWT token ID is included in the request
    print('session')

    def get_queryset(self): # Do not need to pass request in as arguement as it is an attribute of self when using classed base views
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

# To do
# class ClimbDelete(generics.DestroyAPIView):
#     serializer_class = ClimbSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Climb.objects.filter(Climber=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]