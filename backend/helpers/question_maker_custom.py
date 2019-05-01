import random
import json
from backend.helpers import custom_numbers
from backend.helpers.vector_class import Vector
from math import sin, cos

# NOTE: The input_type is the name of the function being called, we could acheive this with a dictionary if required
# In this scheme each template is associated with a single function
dot_prod_direction_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"dot_product_direction",
                     "text":"Let A and B be vectors with angles $ and $ degrees respectively. Is A.B positive,negative or zero?",
                     "output_template":"$","variable_ranges":"custom", "variable_type": "custom"})


cross_product_cardinal_directions_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"cross_product_cardinal_directions",
                     "text":"Let A and B be vectors pointing in $ and $ directions respectively. In which direction does their cross product AxB point?",
                     "output_template":"$","variable_ranges":"custom", "variable_type": "custom"})

cross_product_magnitude_direction_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"cross_product_magnitude_direction",
                     "text":"Let A and B be vectors of magnitude $ and magnitude $ respectively, with a $ angle between them. What is the cross product of these two vectors?",
                     "output_template":"A = $","variable_ranges":"custom", "variable_type": "custom"})

dot_product_magnitude_direction_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"dot_product_magnitude_direction",
                     "text":"Let A and B be vectors of magnitude $ and magnitude $ respectively, with a $ angle between them. What is the dot product of these two vectors?",
                     "output_template":"A = $","variable_ranges":"custom", "variable_type": "custom"})

vector_addition_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_addition_3d",
                     "text":"Let A = $ and B = $. Find the sum A+B ",
                     "output_template":"A+B = $","variable_ranges":"custom", "variable_type": "custom"})

vector_subtraction_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_subtraction_3d",
                     "text":"Let A = $ and B = $. Find the difference A-B ",
                     "output_template":"A-B = $","variable_ranges":"custom", "variable_type": "custom"})


vector_cross_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_cross_3d",
                     "text":"Let A = $ and B = $. Find the cross product AxB ",
                     "output_template":"AxB = $","variable_ranges":"custom", "variable_type": "custom"})

vector_dot_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_dot_3d",
                     "text":"Let A = $ and B = $. Find the dot product A.B ",
                     "output_template":"A.B = $","variable_ranges":"custom", "variable_type": "custom"})

vector_cross_magnitude_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_cross_magnitude_3d",
                     "text":"Let A = $ and B = $. Find the magnitude of their cross product |AxB| ",
                     "output_template":"|AxB| = $","variable_ranges":"custom", "variable_type": "custom"})


def get_new_question_instance_custom(question_template_dict):
    func_name = question_template_dict["input_type"]             #identifying the function's name
    question_json = globals()[func_name](question_template_dict) #executing the function
    print(type(question_json))
    return question_json

#############################HELPERS#####################################
#########################################################################

def custom_populate_text(constants,question_text):
    const_gen = (str(x) for x in constants)
    text_list = list(question_text)
    updated_text_list = [next(const_gen) if x =='$' else x for x in text_list ]
    updated_question_text = ''.join(updated_text_list)
    return updated_question_text

def load_json(question_template_json):
    question_template = json.loads(question_template_json)
    return question_template

def dumps_json(question_instance_dict):
    question_json = json.dumps(question_instance_dict)
    return question_json

############TemplateFunctions######################
###################################################
#Custom functions for each template

#Wrapper function that takes the question template, and used the custom output functions to create a question_json
#Takes a function of return type (input_var_list,solution) and returns a function that takes a question_template and returns a question instance
def decorator_custom_varlist_soln(custom_func):
    def create_question_instance(question_template):
        question_text = question_template["text"]
        output_template = question_template["output_template"]
        (input_const_list,solution) = custom_func()
        updated_text = custom_populate_text(input_const_list,question_text)
        question_instance_dict = {'text':updated_text,'solution':[solution],'output_template':output_template}
        question_json = dumps_json(question_instance_dict)
        return question_json
    return create_question_instance


@decorator_custom_varlist_soln
def dot_product_direction():
	angles = ["0","10","20","30","40","50","60","70","80","90","100","110","120","130","140","150","160","170","180"]
	multiple_choice = tuple(sorted(random.sample(angles,2)))
	vect1 = multiple_choice[0]
	vect2 = multiple_choice[1]
	if vect2 - vect1 == 90:
		answer = "zero"
	elif vect2 - vect1 > 90:
		answer = "negative"
	elif vect2 - vect1 < 90:
		answer = "positive"
	return ([vect1, vect2], answer)

@decorator_custom_varlist_soln
def cross_product_cardinal_directions():
	"""Randomly picks two vector directions and gives their cross product direction"""
	possible_variables = ( "N", "NW", "W", "SW", "S", "SE", "E", "NE","into the page", "out of page")
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
	return ([vect1 ,vect2], answer)

@decorator_custom_varlist_soln
def vector_cross_magnitude_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    cross_vec = v1.cross(v2)
    constants = [v1.__repr__(),v2.__repr__()]
    solution = round(abs(cross_vec),2)
    return (constants,solution)

@decorator_custom_varlist_soln
def cross_product_magnitude_direction():
    angles = ['0','10','20','30','40','50','60','70','80','90','100','110','120'
                                           ,'130','140','150','160','170','180']
    vect1_magnitude, vect2_magnitude = custom_numbers.get_numbers(2,[[0,50],[0,50]])
    angle = random.choice(angles)
    answer = "A*B*cos(%s)" % (vect1_magnitude,vect2_magnitude,angle,angle)
    answer=eval(answer_expr)
    answer=round(answer,2)
    return ([vect1_magnitude, vect2_magnitude, angle], answer)

@decorator_custom_varlist_soln
def dot_product_magnitude_direction():
    angles = ['0','10','20','30','40','50','60','70','80','90','100','110','120'
                                           ,'130','140','150','160','170','180']
    [vect1_magnitude, vect2_magnitude] = custom_numbers.get_numbers(2,[[0,50],[0,50]])

    angle = random.choice(angles)
    answer_expr = "%s*%s*sin(%s)" % (vect1_magnitude,vect2_magnitude,angle)
    answer=eval(answer_expr)
    answer=round(answer,2)
    return ([vect1_magnitude, vect2_magnitude, angle], answer)

#Takes a function that takes two random vectors and returns a vector object and wraps it to create a function that returns (input_var_list,solution)
def decorator_vector_function_problem(vector_function):
    def padded_function():
        v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
        v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
        v1 = Vector(v1_comps)
        v2 = Vector(v2_comps)
        solution_vec = vector_function(v1,v2)
        constants = [v1.__repr__(),v2.__repr__()]
        solution = solution_vec.__repr__()
        return (constants,solution)
    return padded_function


#creating matrix of tuples might be work
@decorator_custom_varlist_soln
def dot_product_direction():
    directions= ["positive","negative","zero"]
    answer = random.choice(directions)
    angles = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180]
    vect1,vect2 = random.sample(angles, 2)
    if answer == "zero":
        vect2 = vect1
    elif answer == "positive":
        while vect2 - vect1 >= 90:
            vect1,vect2 = random.sample(angles, 2)
    elif answer == "negative":
        while vect2 - vect1 <= 90:
            vect1,vect2 = random.sample(angles, 2)
    return (vect1, vect2), answer

@decorator_custom_varlist_soln
@decorator_vector_function_problem
def vector_addition_3d(v1,v2):
    sum_vec = v1 + v2
    return sum_vec

@decorator_custom_varlist_soln
@decorator_vector_function_problem
def vector_subtraction_3d(v1,v2):
    sub_vec = v1 - v2
    return sub_vec

@decorator_custom_varlist_soln
@decorator_vector_function_problem
def vector_dot_3d(v1,v2):
    dot_vec = v1.dot(v2)
    return dot_vec

@decorator_custom_varlist_soln
@decorator_vector_function_problem
def vector_cross_3d(v1,v2):
    cross_vec = v1.cross(v2)
    return cross_vec
