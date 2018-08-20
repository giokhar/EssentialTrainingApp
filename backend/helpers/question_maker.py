from backend.helpers import question_maker_custom as qmc
from random import randint, choice, uniform
import math
import json

DEFAULT_LOWER_BOUND = -100
DEFAULT_UPPER_BOUND = 100

#Checks if the user hasn't entered any malicious code.
def isSafe(code):
	if "import" in code:
		return False
	if "exec" in code:
		return False
	if "eval" in code:
		return False
	if "\n" in code:
		return False
	if "compile" in code:
		return False
	return True

#converts string to a number: int or float, depending on type
def num(s):
	try:
		return int(s)
	except ValueError:
		return float(s)

def populate_text(input_constants, question_text):
	result_string = ""
	input_counter = 0

	for next_word in question_text:
		#it means that a variable is present
		if next_word == '$':
			result_string += str(input_constants[input_counter])+" "
			input_counter += 1
		else:
			result_string += next_word + " "
	return result_string.strip()


def get_new_question_instance(question_template):
	input_type = question_template["input_type"]
	if input_type == "custom":
		return qmc.get_new_question_instance_custom(question_template)
	else:
		return get_new_question_instance_uncustom(question_template)


def get_new_question_instance_uncustom(question_template):
	#question_template = get_question_template(question_id)
	# question_template = {"inputs":["a","b"], "outputs":["a+b", "a-b"],"input_type":"regular","text":"I have $ apples, somebody gave me $ apples. How many apples do I have?","output_template":"A = <$, $>","variable_ranges":[[1,3],[5,7]], "variable_type": "bla"}


	#question_template = json.loads(question_template_json) #NEEDED AFTER CONNECTING TO DATABASE

	#parse the question template
	input_variables = question_template["inputs"]
	output_command_array = question_template["outputs"]
	input_type = question_template["input_type"] #unused
	question_text = question_template["text"].split()
	output_template = question_template["output_template"]
	variable_ranges = question_template["variable_ranges"] #unused yet
	variable_type = question_template["variable_type"] #unused yet

	#produce random variables for
	input_output_constants = produce_new_question_variables(input_variables, output_command_array, variable_ranges, variable_type)

	input_constants = input_output_constants[0]
	output_constants = input_output_constants[1]

	#populates the text with random variables extracted above
	populated_question_text = populate_text(input_constants, question_text)

	#create a json object and store the information that is needed on the front
	final_question_json = {"text":populated_question_text,"solution_list":output_constants, "output_template":output_template} # question text and a solution

	return final_question_json

# input example:input_array = ['a', 'b', 'c', 'd', 'e']
# output_command_array = ["math.sqrt(b+c)", "c+d"]

def produce_new_question_variables(input_array, output_command_array, variable_ranges, variable_type):
	output_array = [0] * len(output_command_array)
	#traverses through the input array
	#and assigns random values that are in input_constants
	#to the variables from the input array.

	input_constants = get_numbers(len(input_array), variable_ranges, variable_type)

	for i in range(len(input_array)):
		next_num = str(input_constants[i])
		next_command = input_array[i] + "=" + next_num
		input_array[i] = num(next_num)

		exec(next_command)#example: exec("a=rand.randint()")

	#traverses through the output_commmand_array and executes those statements
	#The results are written in the output_array.
	for i in range(len(output_command_array)):
		if isSafe(output_command_array[i]):
			next_command = 'output_array[i]=' + output_command_array[i]
			try:
				code = compile(next_command, '<user_string>', 'exec')
				exec(code)

			except Exception as error:
				raise Exception(str(error) + " in output command N"+ str(i+1))

		else:
			raise Exception("Code injection detected!!!")

	return (input_array, output_array)

def get_reals(how_many, variable_ranges, dec_places = 2):
	return [round(uniform(*choice(variable_ranges)), dec_places) for i in range(how_many)]

def get_ints(how_many, variable_ranges):
	return [randint(*choice(variable_ranges)) for i in range(how_many)]

def get_nats(how_many, variable_ranges):
	for next_range in variable_ranges:
		lower_bound = next_range[0]
		if lower_bound < 0 :
			raise ValueError("Natural numbers may not be negative. Please check the given range.")

	return [randint(*choice(variable_ranges)) for i in range(how_many)]


def get_numbers(how_many, variable_ranges, variable_type = "integers"):

	result_list = []

	variable_type = variable_type.lower()
	#in case if no ranges were specified, we are using default values
	if not variable_ranges:
		variable_ranges = [[DEFAULT_LOWER_BOUND, DEFAULT_UPPER_BOUND]] #NOTE: MUST BE LIST OF LISTS

	#variable_ranges example: [0, 5], [10, 15]

	if variable_type == "real":
		list_of_numbers = get_reals(how_many, variable_ranges)

	elif variable_type == "natural":
		list_of_numbers = get_nats(how_many, variable_ranges)

	else: #if the name of variable type is not listed here, we return integers by default
		list_of_numbers = get_ints(how_many, variable_ranges)

	return list_of_numbers

# print(get_new_question_instance(5))

# * =============== *
# * Multiple Choice Questions  *
# * =============== *


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
	return
