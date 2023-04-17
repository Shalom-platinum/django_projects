from rest_framework import serializers
from .models import Todo, Users
from rest_auth.models import TokenModel
from django.contrib.auth import get_user_model

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'author','title','body', 'status', 'created_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email")

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer(many=False, read_only=True)  # this is add by myself.
    class Meta:
        model = TokenModel
        fields = ('key', 'user') 