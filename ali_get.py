from backend.models import *
from backend.serializers import *
from backend.helpers import question_maker as qm
import json, time
from get import *

def completed_quizzes(stud_hash):
    course_id = student_details(stud_hash)['course_id']


def dos():
    for i in QuizLog.objects.raw('SELECT * FROM quizzes WHERE student_hash = 846371617023719985'):
        print(i.student_hash)
