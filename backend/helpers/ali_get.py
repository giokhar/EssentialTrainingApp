from backend.models import *
from backend.serializers import *
from backend.helpers import question_maker as qm
import json, time
from get import *

def completed_quizzes(stud_hash):
    course_id = student_details(stud_hash)['course_id']


def dos():
    c= QuizLog.objects.raw('SELECT * FROM quiz_logs'):
    print(c)
