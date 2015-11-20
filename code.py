from copernicus import Copernicus
from copernicus_helpers import get_sensor_value
from timer import Timer


api = Copernicus()

light = get_sensor_value('light')
temperature = get_sensor_value('temperature')
knob = get_sensor_value('knob')
motion = get_sensor_value('motion')
led_state = False


def knob_handler(sensor_value):
  knob = sensor_value
  print('kocham policje')
  led_state = !led_state
  api.command('led', led_state)

api.set_handler('knob', knob_handler)



api.command('subscribe', '*')

timer_always.start()


while True:
  api.listen()

