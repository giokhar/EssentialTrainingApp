
from backend.helpers import api
# import rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response


class StudentList(APIView):
	def get(self, request):
		return Response(api.get_all_students())

class StudentDetail(APIView):
	def get(self, request, hash):
		return Response(api.get_student_details(hash))


class QuizDetail(APIView):
	def get(self, request, quiz_id):
		return Response(api.get_quiz_details(quiz_id))