from math import *

#var values is a dictionary of variables as keys and values as values
#expression is a string
#TODO allow variables with undefined values to be returned as value
#ask brendon if that is necessary in the first place

def output_calculator(expression,var_values):
  for var in var_values:
    expression=expression.replace(var,var_values[var])
  try:
    result=eval(expression)
  except:
    raise NameError("that is not an input I can understand. Try expressing your equation differently")
  return result


#experiment
#print(output_calculator("sin(a)",{"a":"10","b":"5","c":"3"}
