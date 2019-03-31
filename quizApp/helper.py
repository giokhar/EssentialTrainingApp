import json
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