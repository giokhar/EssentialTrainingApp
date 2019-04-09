from django.conf.urls import url
from django.urls import path
from backend import views


urlpatterns = [
	path('api/students/', views.student_list_view),
	path('api/students/<str:hash>/', views.student_details_view),
	path('api/quizzes/<int:quiz_id>/', views.quiz_details_view),
]