import random
import math

VARIABLE_LOW_RANGE = 0
VARIABLE_HIGH_RANGE = 10
#Parses the qeustion and returns a tuple containing two arrays:
#input_array and output_command_array
def parse_the_question(question_as_string):
	input_array = []
	output_command_array = []
	question_to_list = question_as_string.split()

	for next_word in question_to_list:
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


# input example:input_array = ['a', 'b', 'c', 'd', 'e']
# output_command_array = ["math.sqrt(b+c)", "c+d"]

def produce_new_question_instance(input_array, output_command_array):
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


#Example:
# x = parse_the_question("The first variable is $a4 and the second is $b , return $g=a4+b ")
# print(produce_new_question_instance(x[0], x[1]))