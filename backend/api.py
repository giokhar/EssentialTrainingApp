from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.helpers import get, post

@api_view(["GET"])
def quizzes_by_course_view(request, course_id):
	"""Return JSON response of all quizzes by course_id"""
	return Response(get.quizzes_by_course(course_id))

@api_view(["GET"])
def quizzes_by_student_view(request, hash):
	"""Return JSON response of all quizzes by student_id"""
	return Response(get.quizzes_by_student(hash))

@api_view(["GET"])
def logs_by_quiz_view(request, quiz_id):
	"""Return JSON response of all logs with specified quiz_id"""
	return Response(get.logs_by_quiz(quiz_id))

@api_view(["GET"])
def students_by_course_view(request, course_id):
	"""Return JSON response: hashes of students enrolled in a specific course"""
	return Response(get.students_by_course(course_id))

@api_view(["GET"])
def all_courses_view(request):
	"""Return JSON response of all courses"""
	return Response(get.all_courses())

@api_view(["GET"])
def new_question_view(request, question_template_id):
	"""Return JSON response of student details by hash"""
	return Response(get.new_question(question_template_id))

@api_view(["GET"])
def student_list_view(request):
	"""Return JSON response of all students"""
	return Response(get.all_students())

@api_view(["GET"])
def student_details_view(request, hash):
	"""Return JSON response of student details by hash"""
	return Response(get.student_details(hash))

@api_view(["GET"])
def quiz_details_view(request, quiz_id):
	"""Return JSON response of quiz details"""
	return Response(get.quiz_details(quiz_id))

@api_view(["GET"])
def hash_generator_view(request, amount, course_id):
	"""Return and create hashes in the database"""
	return Response(get.generate_hashes(amount, course_id))


@api_view(["POST"])
def create_quiz_view(request):
    return Response(post.create_quiz(request.data))

@api_view(['POST'])
def create_question_template_view(request):
	return Response(post.create_question_template(request.data))

@api_view(["POST"])
def create_quiz_log_view(request):
	return Response(post.create_quiz_log(request.data))
