import time


def generate_hashes(amount):
	"""Generate a list student hashes based on the amount of students(int)"""
	hashes = []
	for i in range(amount):
		hashes.append(hash(time.time()))
		time.sleep(0.001)
	return hashes