from copernicus import Copernicus as BaseCopernicus

class Copernicus(BaseCopernicus):
	def command(self, cmd, *args):
		if cmd == 'servo' and len(args) == 1:
			position = max(0, min( 31, int(args[0])))
			super(Foo, self).command(cmd, position)
		elif cmd == 'rgb' and len(args) == 1:
			red, green, blue = decompose_colour(args[0])
			super(Foo, self).command(cmd, red, green, blue)
		else:
			super(Foo, self).command(cmd, *args)

def get_initial_sensor_value(sensor_name):
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
