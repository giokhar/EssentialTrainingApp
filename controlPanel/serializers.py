from rest_framework import serializers
from .models import Student, Quiz, Course, QuestionTemplate, QuizLog

#Student Serializer
class StudentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Student
		fields = "__all__"

class QuizSerializer(serializers.ModelSerializer):
	class Meta:
		model = Quiz
		fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = "__all__"

class QuestionTemplateSerializer(serializers.ModelSerializer):
	class Meta:
		model = QuestionTemplate
		fields = "__all__"

class QuizLogSerializer(serializers.ModelSerializer):
	class Meta:
		model = QuizLog
		fields = "__all__"