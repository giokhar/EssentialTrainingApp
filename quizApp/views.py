from django.shortcuts import render
from quizApp import helper as qa_hlp

# Create your views here.
def quiz(request, id):
	data = {}
	data['quiz'] = qa_hlp.get_quiz(id)

	return render(request, "quiz.html", data)