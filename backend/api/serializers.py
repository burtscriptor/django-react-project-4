# Converts Python code into JSON and JSON into Python Code to allow Resprestation Statelless Transfer between client and server

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Climb, Session


class UserSerializer(serializers.ModelSerializer):
    class Meta:  # Specifies the model instance you use
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class ClimbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Climb
        fields = [
           "session","lead", "sent", "rests", "grade", "style", 'project_send_attempt', 'comments'] 
        extra_kwargs = {"climber": {"read_only": True}} # Include the climber in the payload but do not allow it to be mutated.
        # Converts model instance to JSON data, include the listed fields.

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = [
           "created_at", "type", "comments","user", "id", "user"]  # Need to remove a 'user'
        depth=1
        extra_kwargs = {"climber": {"read_only": True}}        

        def display_data(self, validated_data):
            print (self,validated_data)