from django.db import models

# Create your models here.
class Student(models.Model):
	hash = models.CharField(primary_key=True, unique=True, max_length=255)
	created_on = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "students"

class Quiz(models.Model):
	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=255)
	question_json = models.TextField()
	course_ids = models.TextField(null=True)
	created_on =  models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "quizzes"
