# Generated by Django 3.2.8 on 2022-01-15 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='author',
            field=models.CharField(max_length=64),
        ),
    ]