import random
import math

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

def produce_question(input_array, output_command_array):
	output_array = [0] * len(output_command_array)

	for i in range(len(input_array)):
		next_rand = str(random.randint(1,10))
		next_command = input_array[i] + "=" + next_rand
		input_array[i] = int(next_rand)
		
		exec(next_command)

	for i in range(len(output_command_array)):
		if isSafe(output_command_array[i]):
			next_command = 'output_array[i]=' + output_command_array[i]
			try:
				exec(next_command)

			except Exception as error:

				return str(error) + " in output command N"+ str(i+1)

		else:
			return "Code injection detected!!!"

	return (input_array, output_array)  