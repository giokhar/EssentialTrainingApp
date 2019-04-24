import random

# * =============== *
# * Multiple Choice Questions  *
# * =============== *

def cross_product_variables():
	"""Randomly picks two vector directions and gives their cross product direction"""
	possible_variables = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE",
									 "into the page", "out of page")
	vector_directions = tuple(sorted(random.sample(possible_variables, 2)))
	answers = {('W', 'into the page'):'S', ('SW', 'W'):"into the page", ('N', 'NE'):"into the page", ('SE', 'out of page'):"SW",
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
	vect1 = vector_directions[0]
	vect2 = vector_directions[1]
	return vect1, vect2, answer


def cross_product_mult_choice(answer):
	"""for cross product questions, takes the right answer
	returns four multiple choice answers"""
	possible_answers = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE",
								 "into the page", "out of page")
	multiple_choice = random.sample(possible_answers-{answer},3)
	multiple_choice.append(answer)
	return multiple_choice

def cross_product_make_vectors():
	"""Converts from vector to angle for front end"""
	vector_angle={ "N":90, "NW":135, "W":180, "SW":225, "S":270, "SE":315, "E":0, "NE":45}
	vect1, vect2, result = cross_product_variables()
	vect1 = vector_angle[vect1]
	vect2 = vector_angle[vect2]
	result = vector_angle[result]
	return vect1, vect2, result

#this one is going to be harder
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

#|a| x |b| x cos(theta)
def dot_product_direction():
	angles = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180]
	multiple_choice = tuple(sorted(random.sample(angles,2)))
	vect1 = multiple_choice[0]
	vect2 = multiple_choice[1]

	if vect2 - vect1 == 90:
		answer = "zero"
	elif vect2 - vect1 > 90:
		answer = "negative"
	elif vect2 - vect1 < 90:
		answer = "positive"

	return vect1, vect2, answer




def get_multiple_choice(q_type):
	"""takes question type, and returns multiple choices for that question"""
	"""this will be usefull if in the future there will be more question types"""
	return
