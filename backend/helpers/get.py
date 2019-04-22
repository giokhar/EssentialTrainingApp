from backend.models import *
from backend.serializers import *
from backend.helpers import question_maker as qm
import json, time
import random
# * ================ *
# * GET REQUESTS API *
# * ================ *

def test():
	return students_took_quiz(7)

def all_courses():
	"""Return serialized all Course objects"""
	return CourseSerializer(Course.objects.all(),many=True).data

def students_by_course(course_id):
	"""Return a list of students with a specific course_id"""
	return Student.objects.values_list('hash', flat=True).filter(course_id=course_id)

def logs_by_quiz(quiz_id):
	return QuizLogSerializer(QuizLog.objects.all().filter(quiz_id=quiz_id), many=True).data

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

def all_question_templates():
	"""Return serialized all question templates"""
	question_template_objects = QuestionTemplate.objects.all()
	all_templates = []
	for qto in question_template_objects:
		json_object = {"id":qto.id,"type":qto.type,"template_json":json.loads(qto.template_json)}
		all_templates.append(json_object)
	return all_templates


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
	course = Course.objects.get(pk=course_id)
	for i in range(amount):
		my_hash = (course.title +" "+ course.semester).lower().replace(' ', "-") + "-" + str(hash(time.time()))
		serializer = StudentSerializer(data={"hash":my_hash,"course_id":course_id})
		if serializer.is_valid(): # if data matches all the columns
			serializer.save() # insert into db
		hashes.append(my_hash)
		time.sleep(0.001) # sleep for a bit to let it make the time.time() value unique
	return {"hashes":hashes,"course_id":course_id}

def quizzes_by_student(student_hash):
	student_json = StudentSerializer(Student.objects.get(pk = student_hash)).data
	course_id = student_json['course_id']
	all_quizzes = quizzes_by_course(course_id)


	old_quiz_list = completed_quizzes(student_hash)
	new_quiz_list = []

	for quiz in all_quizzes:
		if quiz not in old_quiz_list:
			new_quiz_list.append(quiz)

	return {"old":old_quiz_list,"new":new_quiz_list}



def quizzes_by_course(course_id):
    quizzes_queryset = Quiz.objects.all().filter(course_id=course_id)
    quizzes = []
    for quiz in quizzes_queryset:
        quiz_json = {'id':quiz.id,'title':quiz.title,'created_on' :quiz.created_on}
        quizzes.append(quiz_json)
    return quizzes


# def students_by_quiz(quiz_id):
# 	"""returns students who took a certian quiz"""
# 	student_hashes = []
# 	quiz_logs = (Quiz.objects.all().filter(pk = quiz_id))
# 	for quiz in quiz_logs:
# 		student_hashes.append(quiz["student_hash "])
# 	return StudentSerializer(Student.objects.all().filter(pk__in student_hashes), many=True).data


#how many students are supposed to take a quiz with a certain quiz_id
def number_students(quiz_id):
	quiz_logs = Quiz.objects.all().filter(pk= quiz_id)
	logs_json = QuizSerializer(quiz_logs, many=True).data
	course_id = logs_json[0]["course_id"] #all quiz_ids are for only one course
	students= Student.objects.all().filter(course_id = course_id)
	num_students = students.count()
	return num_students

def students_took_quiz(quiz_id):
	#checks how many completed, failed, and passed quizzes there are
	completed_quiz_logs = QuizLog.objects.all().filter(quiz_id= quiz_id, completed = True)
	num_completed = len(completed_quiz_logs)
	num_students = number_students(quiz_id) #how many studens are supposed to take that quiz
	passed_quiz_logs = QuizLog.objects.all().filter(quiz_id= quiz_id, passed = True)
	num_passed = len(passed_quiz_logs)
	num_failed = (QuizLog.objects.all().filter(quiz_id= quiz_id, completed = True, passed = False))
	if num_students == 0: #to prevent division by zero error
		return "No students are supposed to take that quiz."
	percent_complete = (num_completed / num_students) * 100
	percent_passed = (num_passed / num_students) * 100
	percent_failed = (num_failed / num_students) * 100
	return {"completed": percent_complete, "passed": percent_passed, "failed": percent_failed}





# * =============== *
# * HELPER QUERIES  *
# * =============== *

def completed_quizzes(student_hash):
	"""Return quiz_ids for quizzes that are completed by a specific student"""
	quiz_ids = QuizLog.objects.values_list('quiz_id', flat=True).filter(student_hash=student_hash, completed=True)

	quizzes_queryset = Quiz.objects.all().filter(pk__in=quiz_ids)

	quizzes = []
	for quiz in quizzes_queryset:
		quiz_json = {'id':quiz.id,'title':quiz.title,'created_on' :quiz.created_on}
		quizzes.append(quiz_json)
	return quizzes

# * =============== *
# * Multiple Choice Questions  *
# * =============== *


def multipleChoices(answer):
	"""the right answer
	returns four multiple choice answers"""
	possible_answers = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE", "into the page", "out of page)"
	multiple_choice = random.sample(possible_answers-{answer},3)
	multiple_choice.append(answer)
	return multiple_choice
