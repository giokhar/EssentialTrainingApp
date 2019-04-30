from rest_framework import serializers
from backend.models import *

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
		#fields = "__all__"
		exclude = ('id', 'created_on',)

class QuizLogSerializer(serializers.ModelSerializer):
	class Meta:
		model = QuizLog
		#fields = "__all__"
		exclude = ('id',)