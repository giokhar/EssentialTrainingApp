from backend.models import *
from backend.serializers import *
import json, time

def completed_quizzes(stud_hash):

    id_list = []
    logs=QuizLog.objects.get(student_hash=stud_hash)
    #logs= QuizLog.objects.raw('SELECT quiz_id FROM quiz_logs WHERE student_hash = %s', [stud_hash])

    for log in logs:
        id_list.append(log.quiz_id)

    quiz_list = []
    for id in id_list:
        quizzes = Quiz.object.get(pk = id)
        for quiz in quizzes:
            if quiz.completed:
                quiz_list.append(quiz)

    return quiz_list
