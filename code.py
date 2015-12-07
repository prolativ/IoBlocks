# -*- coding: utf-8 -*-

from copernicus import Copernicus
from copernicus_helpers import get_sensor_value, decompose_colour
from timer import Timer


api = Copernicus()

sensors = {}
sensors['light'] = get_sensor_value('light')
sensors['temperature'] = get_sensor_value('temperature')
sensors['knob'] = get_sensor_value('knob')
sensors['motion'] = get_sensor_value('motion')
led_state = False


def light_handler(sensor_value):
  sensors['light'] = sensor_value

api.set_handler('light', light_handler)


def temperature_handler(sensor_value):
  sensors['temperature'] = sensor_value

api.set_handler('temperature', temperature_handler)


def knob_handler(sensor_value):
  sensors['knob'] = sensor_value
  print('opdksf')
  red_value, green_value, blue_value = decompose_colour('#00ff00')
  api.command('rgb', red_value, green_value, blue_value)

api.set_handler('knob', knob_handler)


def motion_handler(sensor_value):
  sensors['motion'] = sensor_value

api.set_handler('motion', motion_handler)



def button1_handler(button_state):
  red_value, green_value, blue_value = decompose_colour('#5500ff')
  api.command('rgb', red_value, green_value, blue_value)
  print(sensors['knob'])

api.set_handler('button1', button1_handler)



api.command('subscribe', '*')



while True:
  api.listen()

