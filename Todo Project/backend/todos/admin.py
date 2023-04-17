from django.contrib import admin
from .models import Todo, Users
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class UsersInline(admin.StackedInline):
    model = Users
    can_delete = False
    verbose_name_plural = 'users'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UsersInline,)

# Register your models here.
admin.site.register(Todo)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
