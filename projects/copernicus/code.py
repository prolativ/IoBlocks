# -*- coding: utf-8 -*-

from copernicus_helpers import get_initial_sensor_value
from copernicus_helpers import Copernicus

light = None

def do_something():
  for count in range(10):
    pass

light = get_initial_sensor_value('light')

def light_handler(sensor_value):
  global light
  light = sensor_value


api = Copernicus()

api.set_handler('light', light_handler)

api.command('subscribe', '*')

while True:
  api.listen()
