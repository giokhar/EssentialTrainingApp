# Generated by Django 2.1.7 on 2019-03-27 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('hash', models.CharField(max_length=255, primary_key=True, serialize=False, unique=True)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
