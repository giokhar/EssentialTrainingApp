from random import randint, choice, uniform
import math
import json
from numbers import get_numbers,get_ints,get_nats,get_reals

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


# print(get_new_question_instance(5))
