from random import randint, choice, uniform
import math
import json

DEFAULT_LOWER_BOUND = 0
DEFAULT_UPPER_BOUND = 10

#input example: ["asdfads", "$a", "$b=a"]
#Parses the qeustion and returns a tuple containing two arrays:
#input_array and output_command_array
def parse_the_question(question_list):
	input_array = []
	output_command_array = []

	for next_word in question_list:
		#it means that a varible is present
		if next_word[0] == '$':
			if len(next_word) > 2 and next_word[2] == '=':
				output_command = next_word[3:]
				output_command_array.append(output_command)
			else:
				input_variable = next_word[1:]
				input_array.append(input_variable)
	return (input_array, output_command_array)

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

def get_new_question_instance(question_id):
	#question_template = get_question_template(question_id)
	question_template_json = {"inputs":["a","b"], "outputs":["a+b", "a-b"],"input_type":"regular","text":"I have $ apples, somebody gave me $ apples. How many apples do I have?","output_template":"A = <$, $>","variable_ranges":[[1,100],[105,200]], "variable_type": "reals"}

	#question_template = json.loads(question_template_json) #NEEDED AFTER CONNECTING TO DATABASE
	question_template = question_template_json



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
	return_dict = {"text":populated_question_text,"solution_list":output_constants, "output_template":output_template} # question text and a solution
	final_question_json = json.dumps(return_dict)

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
		input_array[i] = int(next_num)
		
		exec(next_command)#example: exec("a=rand.randint()")

	#traverses through the output_commmand_array and executes those statements
	#The results are written in the output_array.
	for i in range(len(output_command_array)):
		if isSafe(output_command_array[i]):
			next_command = 'output_array[i]=' + output_command_array[i]
			try:
				exec(next_command)

			except Exception as error:
				#This segment of the code forwards whatever error was caught.
				return str(error) + " in output command N"+ str(i+1)

		else:
			return "Code injection detected!!!"

	return (input_array, output_array)

def get_reals(how_many, variable_ranges, dec_places = 2):
	return [round(uniform(*choice(variable_ranges)),dec_places) for i in range(how_many)]

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
		variable_ranges = [DEFAULT_LOWER_BOUND, DEFAULT_UPPER_BOUND]

	#variable_ranges example: [0, 5], [10, 15]

	if variable_type == "real":
		list_of_numbers = get_reals(how_many, variable_ranges)

	elif variable_type == "natural":
		list_of_numbers = get_nats(how_many, variable_ranges)

	else: #if the name of variable type is not listed here, we return integers by default
		list_of_numbers = get_ints(how_many, variable_ranges)

	return list_of_numbers

#print(get_numbers(5, 0, 6, variable_type = "natural"))

# print(produce_new_question_instance(5))
#Example:
# x = parse_the_question("The first variable is $a4 and the second is $b , return $g=a4+b ")
# print(produce_new_question_instance(x[0], x[1]))