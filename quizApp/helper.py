import json
import math
import random
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

# Get various kinds of numbers
# TODO:  Implement keyword arguments: isNonZero,
def get_reals( how_many,a,b, dec_places = 2):
    return (round(random.uniform(a,b),dec_places) for i in range(how_many))


def get_ints( how_many,a,b, dec_places = 2):
    return (random.randint(a,b) for i in range(how_many))

def get_nats(how_many,a,b):
    if a < 0 :
        raise ValueError("Natural numbers may not be negative. Please check the given range.")
    else:
        return (random.randint(a,b) for i in range(how_many))

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

VARIABLE_LOW_RANGE = 0
VARIABLE_HIGH_RANGE = 10

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
    return True

def produce_new_question_instance(question_id):
    #question_template = get_question_template(question_id)
    question_template = {"inputs":["a","b"], "outputs":["a+b", "a-b"], "input_type":"regular","text":"I have $ apples, somebody gave me $ apples. How many apples do I have?","output_template":"A = <$, $>","input_values":[[1,100],[100,200]]}

    # lists = parse_the_question(question_template)

    input_variables = question_template["inputs"]
    output_variables = question_template["outputs"]
    text = question_template["text"].split()
    output_template = question_template["output_template"]


    input_output_constants = produce_new_question_variables(input_variables, output_variables)

    input_constants = input_output_constants[0]
    output_constants = input_output_constants[1]

    result_string = ""
    input_counter = 0

    for next_word in text:
        #it means that a variable is present
        if next_word == '$':
            result_string += str(input_constants[input_counter])+" " 
            input_counter += 1
        else:
            result_string += next_word + " "

    return (result_string.strip(), output_template, output_constants)

# input example:input_array = ['a', 'b', 'c', 'd', 'e']
# output_command_array = ["math.sqrt(b+c)", "c+d"]

def produce_new_question_variables(input_array, output_command_array):
    output_array = [0] * len(output_command_array)
    #traverses through the input array
    #and assigns random values from (VARIABLE_LOW_RANGE, VARIABLE_HIGH_RANGE)
    #to the variables from the input array.
    for i in range(len(input_array)):
        next_rand = str(random.randint(VARIABLE_LOW_RANGE,VARIABLE_HIGH_RANGE))
        next_command = input_array[i] + "=" + next_rand
        input_array[i] = int(next_rand)
        
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

print(produce_new_question_instance(5))
#Example:
# x = parse_the_question("The first variable is $a4 and the second is $b , return $g=a4+b ")
# print(produce_new_question_instance(x[0], x[1]))
