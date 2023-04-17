from django.urls import path
from .views import ListTodo, DetailTodo, StatusTodo,DeleteTodo,CreateTodo, UserList, UserDetail

urlpatterns = [
    path('<int:pk>/', DetailTodo.as_view()),
    path('', ListTodo.as_view()),
    path('<int:pk>/delete/', DeleteTodo.as_view()),
    path('create/', CreateTodo.as_view()),
    path('<int:pk>/status/', StatusTodo.as_view()),
    path('users/', UserList.as_view()), # new
    path('users/<int:pk>/', UserDetail.as_view()), 
]