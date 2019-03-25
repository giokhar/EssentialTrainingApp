from django.urls import path
from quizMaker import views

urlpatterns = [
	path('quizMaker/', views.index, name = "index"),
]