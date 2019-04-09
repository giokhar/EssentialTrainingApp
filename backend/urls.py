from django.conf.urls import url
from django.urls import path
from backend import views


urlpatterns = [
	# GET METHODS
	path('api/students/', views.student_list_view),
	path('api/students/<str:hash>/', views.student_details_view),
	path('api/quizzes/<int:quiz_id>/', views.quiz_details_view),
	path('api/hashes/<int:amount>/<int:course_id>/', views.hash_generator_view),

	# POST METHODS
	# path('api/create/students/', views.create_students_view),
]