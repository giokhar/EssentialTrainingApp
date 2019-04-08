# models and serializers
from backend.models import Student, Quiz, Course, QuestionTemplate, QuizLog
from backend.serializers import StudentSerializer, QuizSerializer, CourseSerializer, QuestionTemplateSerializer, QuizLogSerializer
# rest_framework
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
# helpers directory
from backend.helpers.api import get_quiz_details_json

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

	@action(detail=True)
	def details(self, request, *args, **kwargs):
		"""Returns the detailed quiz object for front-end"""
		return Response(get_quiz_details_json(self.get_object().id))

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