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
	question_json = models.TextField(null=True)
	is_published = models.BooleanField(default=False)
	course_ids = models.TextField(null=True)
	created_on =  models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "quizzes"

class Course(models.Model):
	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=255)
	hashes_json = models.TextField(null=True)
	created_on =  models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "courses"

class QuestionTemplate(models.Model):
	id = models.AutoField(primary_key=True)
	type = models.CharField(max_length=255)
	template_json = models.TextField(null=True)
	created_on =  models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "question_templates"

class QuizLog(models.Model):
	id = models.AutoField(primary_key=True)
	student_hash = models.CharField(max_length=255)
	quiz_id = models.IntegerField(null=True)
	results_json = models.TextField(null=True)
	num_questions = models.IntegerField(null=True)
	num_incorrect = models.IntegerField(null=True)
	start_time =  models.DateTimeField(null=True)
	end_time = models.DateTimeField(null=True)

	class Meta:
		db_table = "quiz_logs"

