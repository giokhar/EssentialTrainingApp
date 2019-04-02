import json
import math
import random
from controlPanel.models import Quiz, Course, QuestionTemplate, Student


def get_quiz(quiz_id):
	output = {}
	output['questions'] = {}
	quiz = Quiz.objects.get(id=quiz_id, is_published=True)
	question_json = json.loads(quiz.question_json)

	for template_id, correct in question_json.items():
		output['questions'][get_question(template_id)] = correct
	return output


def get_question(template_id):
	return QuestionTemplate(id=template_id)

# Get various kinds of numbers
# TODO:  Implement keyword arguments: isNonZero,
def get_reals( how_many,a,b, dec_places = 2):
    return (round(random.uniform(a,b),dec_places) for i in range(how_many))


def get_ints( how_many,a,b, dec_places = 2):
    return (random.randint(a,b) for i in range(how_many))

def get_nats(how_many,a,b):
    if a < 0 :
        raise ValueError("Natural numbers may not be negative. Please check the given range.")
    else:
        return (random.randint(a,b) for i in range(how_many))

def get_numbers(*args,numeric_type = "real"):
    numeric_type = numeric_type.lower()
    if numeric_type == "real":
        reals = get_reals(*args)
        return reals
    if numeric_type == "natural":
        nats = get_nats(*args)
        return nats
    if numeric_type == "integer":
        ints = get_ints(*args)
        return ints
