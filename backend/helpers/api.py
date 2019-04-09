from backend.models import *
from backend.serializers import *
import json


def get_all_students():
	return StudentSerializer(Student.objects.all(), many=True).data

def get_student_details(hash):
	return StudentSerializer(Student.objects.get(pk=hash)).data

def get_quiz_details(quiz_id):
	quiz_obj = Quiz.objects.get(pk=quiz_id)
	# TODO: Check if this hash is registered for this course and if this quiz allowed
	details = {"title":quiz_obj.title, "questions":[],"is_published":quiz_obj.is_published}
	questions = json.loads(quiz_obj.question_json)
	for template_id, amount in questions.items():
		template_obj = QuestionTemplate.objects.get(pk=template_id)
		details['questions'].append({"template":json.loads(template_obj.template_json),"type":template_obj.type,"amount":amount})

	return details


# ================
# POST REQUESTS
# ================
def validate_student_hashes(data):
	serializer = StudentSerializer(data=data)
	if serializer.is_valid():
		serializer.save()
	return {"success":serializer.is_valid()}
