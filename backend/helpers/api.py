from backend.models import *
from backend.serializers import *
import json, time


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

def generate_hashes(amount, course_id):
	"""Generate a json student hashes based on the amount of students(int) and the course_id"""
	hashes = []
	my_hash = 0
	for i in range(amount):
		my_hash = hash(time.time())
		serializer = StudentSerializer(data={"hash":my_hash,"course_id":course_id})
		if serializer.is_valid(): # if data matches all the columns
			serializer.save() # insert into db
		hashes.append(my_hash)
		time.sleep(0.001) # sleep for a bit to let it make the time.time() value unique
	return {"hashes":hashes,"course_id":course_id}


# ================
# POST REQUESTS
# ================
# def validate_student_hashes(data):
# 	serializer = StudentSerializer(data=data)
# 	if serializer.is_valid():
# 		serializer.save()
# 	return {"success":serializer.is_valid()}
