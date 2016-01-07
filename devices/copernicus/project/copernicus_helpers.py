from copernicus import Copernicus as BaseCopernicus

class Copernicus(BaseCopernicus):
	def command(self, cmd, *args):
		if cmd == 'servo' and len(args) == 1:
			position = max(0, min( 31, int(args[0])))
			BaseCopernicus.command(self, cmd, position)
		elif cmd == 'rgb' and len(args) == 1:
			red, green, blue = decompose_colour(args[0])
			BaseCopernicus.command(self, cmd, red, green, blue)
		else:
			BaseCopernicus.command(self, cmd, *args)

def get_initial_sensor_value(sensor_name):
	api = Copernicus()
	value = []

	def handler(sensor_value):
		print("sensor value inside:" + str(sensor_value))
		value.append(sensor_value)
	
	api.set_handler(sensor_name, handler)
	print(sensor_name)
	api.command('query', sensor_name)
	while len(value) < 1:
		api.listen() #blocks waiting for result
	print("sensor value outside:" + str(value))

	api.set_handler(sensor_name, None)

	return value[0]

def decompose_colour(colour):
	#get each colour as a number 0 - 3
	red = int(colour[1:3], 16) / 85
	green = int(colour[3:5], 16) / 85
	blue = int(colour[5:7], 16) / 85
	return (red, green, blue)

def reset_device():
	api = Copernicus()
	api.command('subscribe')
	api.command('led', False)
	api.command('rgb', 0, 0, 0)
	api.command('servo', 0)
