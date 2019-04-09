from django.conf.urls import url
from django.urls import path
from backend import api


urlpatterns = [
	# GET METHODS
	path('students/', api.student_list_view),
	path('students/<str:hash>/', api.student_details_view),
	path('quizzes/<int:quiz_id>/', api.quiz_details_view),
	path('hashes/<int:amount>/<int:course_id>/', api.hash_generator_view),

	# POST METHODS
	path('create/quiz', api.create_quiz_view)
]