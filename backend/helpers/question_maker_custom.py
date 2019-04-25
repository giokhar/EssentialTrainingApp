import random
import json

# NOTE: The input_type is the name of the function being called, we could acheive this with a dictionary if required
# In this scheme each template is associated with a single function
dot_prod_direction_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"dot_product_direction",
                     "text":"Let v1 and v2 be vectors with angles $ and $ degrees respectively. Is v1.v2 positive,negative or zero?",
                     "output_template":"A = $","variable_ranges":"custom", "variable_type": "custom"})

cross_product_cardinal_directions_template = json.dumps({"inputs":"custom", "outputs":"single value","input_type":"cross_product_cardinal_directions",
                     "text":"Let v1 and v2 be vectors pointing in $ and $ directions respectively. In which direction v1 cross v2 pointing?",
                     "output_template":"A = $","variable_ranges":"custom", "variable_type": "custom"})

def get_new_question_instance_custom(question_template_json):
    question_template_dict = load_json(question_template_json)
    func_name = question_template_dict["input_type"]
    question_json = globals()[func_name](question_template_dict) #executing the function
    return question_json

#Wrapper function that takes the question template, and used the custom output functions to create a question_json
#Takes a function of return type (vector,vector,solution) and returns a function that takes a question_template and returns a question instance
def decorator_custom_vec_vec_soln(custom_func):
    def create_question_instance(question_template):
        question_text = question_template["text"]
        output_template = question_template["output_template"]
        (v1,v2,solution) = custom_func()
        input_vars = [v1,v2]
        updated_text = custom_populate_text(input_vars,question_text)
        question_instance_dict = {'text':updated_text,'solution':solution,'output_template':output_template}
        question_json = dumps_json(question_instance_dict)
        return question_json
    return create_question_instance

############TemplateFunctions######################
###################################################

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
	return vect1, vect2, answer

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
	return vect1, vect2, answer

################################HELPERS##############################
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
    dot_product_direction = decorator_custom_vec_vec_soln(dot_product_direction)
    cross_product_cardinal_directions = decorator_custom_vec_vec_soln(cross_product_cardinal_directions)
    print(get_new_question_instance_custom(dot_prod_direction_template))
    print(get_new_question_instance_custom(cross_product_cardinal_directions_template))
