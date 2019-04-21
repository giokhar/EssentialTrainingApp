from backend.models import *
from backend.serializers import *
from backend.helpers import question_maker as qm
import json

# * ================= *
# * POST REQUESTS API *
# * ================= *

def create_quiz(data):
	serializer = QuizSerializer(data=data)
	if serializer.is_valid():
		serializer.save()
	return {"success":serializer.is_valid()}

def create_question_template(data):
	serializer = QuestionTemplateSerializer(data=data)

	isValidQuestionTemplate = True
	error_message = ""

	if serializer.is_valid():
		serializer_data = serializer.validated_data
		question_template = json.loads(serializer_data["template_json"])

		try:
			qm.get_new_question_instance(question_template)
			serializer.save()

		except Exception as error:
			isValidQuestionTemplate = False
			error_message = str(error)
	else:
		error_message = "Data given didn't match serializer format!"

	return {"success":serializer.is_valid() and isValidQuestionTemplate, "error":error_message}

def create_quiz_log(data):
	serializer = QuizLogSerializer(data = data)
	if serializer.is_valid():
		serializer.save()
	return {"success":serializer.is_valid()}
