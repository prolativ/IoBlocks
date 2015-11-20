from copernicus import Copernicus

def get_sensor_value(sensor_name):
	api = Copernicus()
	value = None

	def handler(sensor_value):
		value = sensor_value
	
	api.set_handler(sensor_name, handler)
	api.command('query', sensor_name)
	api.listen() #blocks waiting for result

	api.set_handler(sensor_name, None)

	return value

def decompose_colour(colour):
	#get each colour as a number 0 - 3
	red = int(colour[1:3], 16) / 85
	green = int(colour[3:5], 16) / 85
	blue = int(colour[5:7], 16) / 85
	return (red, green, blue)
