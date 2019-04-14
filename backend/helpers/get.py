from backend.models import *
from backend.serializers import *
from backend.helpers import question_maker as qm
import json, time

# * ================ *
# * GET REQUESTS API *
# * ================ *


#TO BE DONE
def new_question(question_template_id):
	question_template_obj = QuestionTemplateSerializer(QuestionTemplate.objects.get(pk=question_template_id)).data
	question_template = json.loads(question_template_obj["template_json"])
	return qm.get_new_question_instance(question_template)

def all_students():
	"""Return serialized all student objects"""
	return StudentSerializer(Student.objects.all(), many=True).data

def student_details(hash):
	"""Return serialized student object by hash"""
	return StudentSerializer(Student.objects.get(pk=hash)).data

def quiz_details(quiz_id):
	"""Return the JSON of quiz details"""
	quiz_obj = Quiz.objects.get(pk=quiz_id)
	#useful if there are unpublished quizzes.
	# if quiz_obj._meta.get_field(is_published) == False:
	# 	raise ExceptionError ("Quiz not pulished yet")
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
