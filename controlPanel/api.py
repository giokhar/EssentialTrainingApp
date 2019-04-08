from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets, permissions

class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = StudentSerializer