from random import randint, choice, uniform
import math

DEFAULT_LOWER_BOUND = -100
DEFAULT_UPPER_BOUND = 100

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
