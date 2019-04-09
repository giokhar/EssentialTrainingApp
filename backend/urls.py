from django.conf.urls import url
from django.urls import path
from backend import views


urlpatterns = [
	path('api/students/', views.StudentList.as_view()),
	path('api/students/<str:hash>/', views.StudentDetail.as_view()),
	path('api/quizzes/<int:quiz_id>/', views.QuizDetail.as_view()),
]