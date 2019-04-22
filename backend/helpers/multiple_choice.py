import random

# * =============== *
# * Multiple Choice Questions  *
# * =============== *

def cross_product_make_question():
	possible_variables = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE",
									 "into the page", "out of page")
	vector_directions = tuple(sorted(random.sample(possible_variables, 2)))
	answers ={('W', 'into the page'):'S', ('SW', 'W'):"into the page", ('N', 'NE'):"into the page", ('SE', 'out of page'):"SW",
	('SW', 'out of page'):"NW", ('NW', 'SE'):"Zero", ('S', 'into the page'):"E", ('NE', 'SW'):"zero",
	('NE', 'NW'):"out of the page", ('NW', 'S'):"out of the page", ('E', 'NE'):"out of the page", ('NW', 'out of page'):"NE", ('E', 'SE'):"into the page",
	('E', 'out of page'):"S", ('NE', 'into the page'):"NW", ('NW', 'SW'):"out of the page", ('S', 'out of page'):"W",
	('NE', 'SE'):"into the page", ('E', 'N'):"out of the page", ('N', 'SE'):"into the page",
	('E', 'NW'):"out of the page", ('S', 'SW'):"into the page", ('NE', 'W'):"out of the page",
	('NW', 'W'):"out of the page", ('SE', 'SW'):"into the page", ('SE', 'W'):"into the page",
	('S', 'SE'):"out of the page", ('N', 'W'):"out of the page", ('N', 'SW'):"out of the page",
	('SE', 'into the page'):"NE", ('N', 'S'):"zero", ('E', 'SW'):"into the page",
	('N', 'NW'):"out of the page", ('E', 'into the page'):"N",
	('W', 'out of page'):"N", ('NW', 'into the page'):"SQ", ('E', 'W'):"zero", ('N', 'into the page'):"W",
	('E', 'S'):"into the page", ('NE', 'out of page'):"SE", ('S', 'W'):"out of the page",
	('NE', 'S'):"into the page", ('SW', 'into the page'):"SE",
	('into the page', 'out of page'):"zero", ('N', 'out of page'):"E"}
	answer = answers[vector_directions]
	return (vector_directions, answer)


def cross_product_mult_choice(answer):
	"""for cross product questions, takes the right answer
	returns four multiple choice answers"""
	possible_answers = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE",
								 "into the page", "out of page")
	multiple_choice = random.sample(possible_answers-{answer},3)
	multiple_choice.append(answer)
	return multiple_choice


def simple_components_mult_choice(answer):
	"""for sample component questions, takes the right answer
	returns four multiple choice answers"""
	possible_answers = ("A-sin(θ)", "A+sin(θ)", "(-A)-sin(θ)", "(-A)+sin(θ)",
	"A-sin(θ)", "A+sin(θ)", "(-A)-sin(θ)", "(-A)+sin(θ)","A-cos(θ)", "A+cos(θ)",
	"cos(θ)", ("-cos(θ)"),"tan(θ)","(-A)-cos(θ)", "(-A)+cos(θ)","A-cos(θ)",
	"Acos(θ)", "(-A)-cos(θ)","(-A)+cos(θ)", "A-tan(θ)","A+tan(θ)","(-A)-tan(θ)",
	"(-A)+tan(θ)", "A-tan(θ)", "A+tan(θ)","(-A)-tan(θ)","(-A)+tan(θ)","-sin(θ)",
	"+sin(θ)", "-tan(θ)")
	multiple_choice = random.sample(possible_answers-{answer},3)
	multiple_choice.append(answer)
	return multiple_choice

def get_multiple_choice(q_type):
	"""takes question type, and returns multiple choices for that question"""
	"""this will be usefull if in the future there will be more question types"""
	return
print(cross_product_make_question())
