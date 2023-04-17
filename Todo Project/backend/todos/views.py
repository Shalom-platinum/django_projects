from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .permissions import IsAuthorOrReadOnly
from rest_framework import generics, permissions
from .models import Todo, Users
from .serializers import TodoSerializer, UserSerializer


# Create your views here.
class ListTodo(generics.ListAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = TodoSerializer
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Todo.objects.filter(author=user)
    

class DetailTodo(generics.RetrieveAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DeleteTodo(generics.DestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class CreateTodo(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class StatusTodo(generics.UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# this is for the user authentication side of views

class UserList(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView): # new
    queryset = get_user_model().objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
