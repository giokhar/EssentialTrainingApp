# Generated by Django 2.1.7 on 2019-04-09 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20190409_0050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='course_id',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='course_id',
            field=models.CharField(max_length=255, null=True),
        ),
    ]