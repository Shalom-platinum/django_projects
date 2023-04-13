# Generated by Django 3.0 on 2022-06-14 11:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('images', '0002_auto_20220614_1210'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='users_like',
            field=models.ManyToManyField(blank=True, related_name='images_liked', to=settings.AUTH_USER_MODEL),
        ),
    ]