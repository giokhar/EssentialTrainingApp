from django.urls import path
from quizApp import views

urlpatterns = [
	path('quiz/<int:id>/', views.quiz, name = "quiz"),
]