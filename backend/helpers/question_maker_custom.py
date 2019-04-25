import random
import json
import custom_numbers
from vector_class import Vector

# NOTE:  All of these templates will be added to the DATABASE after being finalized.
# NOTE: The input_type is the name of the function being called, we could acheive this with a dictionary if required
# In this scheme each template is associated with a single function
dot_prod_direction_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"dot_product_direction",
                     "text":"Let v1 and v2 be vectors with angles $ and $ degrees respectively. Is v1.v2 positive,negative or zero?",
                     "output_template":"$","variable_ranges":"custom", "variable_type": "custom"})

cross_product_cardinal_directions_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"cross_product_cardinal_directions",
                     "text":"Let v1 and v2 be vectors pointing in $ and $ directions respectively. In which direction v1 cross v2 pointing?",
                     "output_template":"$","variable_ranges":"custom", "variable_type": "custom"})

vector_addition_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_addition_3d",
                     "text":"Let A = $ and B = $. Find the sum A+B ",
                     "output_template":"A+B = $","variable_ranges":"custom", "variable_type": "custom"})

vector_subtraction_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_subtraction_3d",
                     "text":"Let A = $ and B = $. Find the difference A-B ",
                     "output_template":"A-b = $","variable_ranges":"custom", "variable_type": "custom"})

vector_cross_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_cross_3d",
                     "text":"Let A = $ and B = $. Find the cross product AxB ",
                     "output_template":"AxB = $","variable_ranges":"custom", "variable_type": "custom"})

vector_dot_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_dot_3d",
                     "text":"Let A = $ and B = $. Find the dot product A.B ",
                     "output_template":"A.B = $","variable_ranges":"custom", "variable_type": "custom"})

vector_cross_magnitude_3d_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"vector_cross_magnitude_3d",
                     "text":"Let A = $ and B = $. Find the magnitude of their cross product |AxB| ",
                     "output_template":"|AxB| = $","variable_ranges":"custom", "variable_type": "custom"})


def get_new_question_instance_custom(question_template_json):
    question_template_dict = load_json(question_template_json)
    func_name = question_template_dict["input_type"]
    question_json = globals()[func_name](question_template_dict) #executing the function
    return question_json

#Wrapper function that takes the question template, and used the custom output functions to create a question_json
#Takes a function of return type (inpu_var_list,solution) and returns a function that takes a question_template and returns a question instance
def decorator_custom_varlist_soln(custom_func):
    def create_question_instance(question_template):
        question_text = question_template["text"]
        output_template = question_template["output_template"]
        (input_const_list,solution) = custom_func()
        updated_text = custom_populate_text(input_const_list,question_text)
        question_instance_dict = {'text':updated_text,'solution':solution,'output_template':output_template}
        question_json = dumps_json(question_instance_dict)
        return question_json
    return create_question_instance

############TemplateFunctions######################
###################################################

# NOTE:  Ideally these will be in a seperate file
#Custom function corresponding to the template
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
	return ([vect1, vect2], answer)

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

def vector_addition_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    sum_vec = v1 + v2
    constants = [v1.__repr__(),v2.__repr__()]
    solution = sum_vec.__repr__()
    return (constants,solution)

def vector_subtraction_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    sub_vec = v1 - v2
    constants = [v1.__repr__(),v2.__repr__()]
    solution = sub_vec.__repr__()
    return (constants,solution)

def vector_dot_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    dot_vec = v1.dot(v2)
    constants = [v1.__repr__(),v2.__repr__()]
    solution = dot_vec.__repr__()
    return (constants,solution)

def vector_cross_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    cross_vec = v1.cross(v2)
    constants = [v1.__repr__(),v2.__repr__()]
    solution = cross_vec.__repr__()
    return (constants,solution)

def vector_cross_magnitude_3d():
    v1_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v2_comps = custom_numbers.get_numbers(3,[[0,10],[0,10],[0,10]],variable_type='natural')
    v1 = Vector(v1_comps)
    v2 = Vector(v2_comps)
    cross_vec = v1.cross(v2)
    constants = [v1.__repr__(),v2.__repr__()]
    solution = round(abs(cross_vec),2)
    return (constants,solution)

#########################WRAPPINGFUNCTIONS##########################
####################################################################
dot_product_direction = decorator_custom_varlist_soln(dot_product_direction)
cross_product_cardinal_directions = decorator_custom_varlist_soln(cross_product_cardinal_directions)
vector_addition_3d = decorator_custom_varlist_soln(vector_addition_3d)
vector_subtraction_3d = decorator_custom_varlist_soln(vector_subtraction_3d)
vector_dot_3d = decorator_custom_varlist_soln(vector_dot_3d)
vector_cross_3d = decorator_custom_varlist_soln(vector_cross_3d)
vector_cross_magnitude_3d = decorator_custom_varlist_soln(vector_cross_magnitude_3d)


#########################HELPERS#####################################
#####################################################################

#Assert that there are an equal number of constants and spaces for constants in the question text
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

if __name__ == '__main__':
    # print(get_new_question_instance_custom(vector_dot_3d_template))
    print(get_new_question_instance_custom(vector_cross_magnitude_3d_template))
    # print(get_new_question_instance_custom(dot_prod_direction_template))
    # print(get_new_question_instance_custom(cross_product_cardinal_directions_template))
