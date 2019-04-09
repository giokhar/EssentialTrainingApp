
from backend.helpers import api
# import rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def student_list_view(request):
	return Response(api.get_all_students())

@api_view(["GET"])
def student_details_view(request, hash):
	return Response(api.get_student_details(hash))

@api_view(["GET"])
def quiz_details_view(request, quiz_id):
	return Response(api.get_quiz_details(quiz_id))