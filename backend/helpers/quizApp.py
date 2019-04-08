import random
import math
import json

question_template = {"inputs":["a","b"], "outputs":["a+b", "a-b"], "input_type":"regular","text":"I have $ apples, somebody gave me $ apples. How many apples do I have?","output_template":"A = <$, $>","input_values":[[1,100],[100,200]]}
modified_question_template = {"input_num": 2, "outputs":["a0+a1", "a0-a1"], "input_type":"regular","text":"Find the sum and difference of $ and $","output_template":"A = <$, $>","input_range":[1,100]}
sample_question = {"text": "Find the sum and difference of 79.84 and 74.89", "solution": [154.73, 4.95], "solution_template": "A = <154.73, 4.95>"}

## changes:
# inputs -> input_num
##suggested changes:
# input_values list of lists to list of tuples (not used for now!)
# output_tempalte -> solution_template
# suggested, input_type -> numeric_type
# add a new field for rounding, i.e. number of decimal places for inputs and outputs

#Takes a json question template, and returns a question instance
def new_question_instance(question_template_json):
    question_template = json.loads(question_template_json)
    input_num = question_template["input_num"]                 # CHANGED
    output_command_array = question_template["outputs"]
    input_type = question_template["input_type"]               # unused
    input_ranges = question_template["input_values"]           # unused
    text_template = question_template["text"]
    solution_template = question_template["output_template"]

    input_constants = get_input_constants(input_num)
    solution_constants = get_output_constants(input_constants,output_command_array)
    text_constants = populate_text(text_template,input_constants)
    populated_solution_template = populate_solution_template(solution_template,solution_constants)
    question_dict = {"text":text_constants,"solution_list":solution_constants,"solution_string":populated_solution_template}
    question_json = json.dumps(question_dict)

    return question_json

def populate_solution_template(solution_template,solution_constants):
    solution_generator = (x for x in solution_constants)
    populated_template = ""
    for char in [x for x in solution_template] :
        if char == '$':
            populated_template += str(next(solution_generator) )
        else:
            populated_template += char
    return populated_template

def populate_text(text_template,input_constants):
    text_constants = ""
    input_generator = (x for x in input_constants)
    for word in str.split(text_template):
        if word == '$':
            text_constants += " " + str(next(input_generator))
        else:
            text_constants += " " + word
    return str(text_constants)

def get_input_constants(number_of_constants,lower_bound = 1, upper_bound = 100,  numeric_type = "real"):
    input_constants = get_numbers(number_of_constants,lower_bound,upper_bound,numeric_type = numeric_type)
    return input_constants

#Takes a list of values and an array of commands, and returns the results of evaluating each expression
def get_output_constants(input_values ,output_code_array, dec_places = 2 ):
    output_array = []
    how_many = len(input_values)
    for i in range(len(input_values)):
        local_name = 'a' + str(i)
        locals()[local_name] = input_values[i]
    for command in output_code_array:
        if isSafe(command):
            code = compile(command,'<user_string>','eval')
            output_values = round( eval(code)  ,dec_places)
            output_array.append(output_values)
        else :
            raise ValueError('output_code_array contains invalid statements')
    return output_array

def isSafe(code):
	if "import" in code:
		return False
	if "exec" in code:
		return False
	if "eval" in code:
		return False
	if "\n" in code:
		return False
	return True

def get_reals( how_many,a,b, dec_places = 2):
    return [round(random.uniform(a,b),dec_places) for i in range(how_many)]

def get_ints( how_many,a,b):
    return [random.randint(a,b) for i in range(how_many)]

def get_nats(how_many,a,b):
    if a < 0 :
        raise ValueError("Natural numbers may not be negative. Please check the given range.")
    else:
        return [random.randint(a,b) for i in range(how_many)]

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
