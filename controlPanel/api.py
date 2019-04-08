from .models import Student, Quiz, Course, QuestionTemplate, QuizLog
from .serializers import StudentSerializer, QuizSerializer, CourseSerializer, QuestionTemplateSerializer, QuizLogSerializer
from rest_framework import viewsets, permissions

class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = StudentSerializer

class QuizViewSet(viewsets.ModelViewSet):
	queryset = Quiz.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = QuizSerializer

class CourseViewSet(viewsets.ModelViewSet):
	queryset = Course.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = CourseSerializer

class QuestionTemplateViewSet(viewsets.ModelViewSet):
	queryset = QuestionTemplate.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = QuestionTemplateSerializer

class QuizLogViewSet(viewsets.ModelViewSet):
	queryset = QuizLog.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = QuizLogSerializer