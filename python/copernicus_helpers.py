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