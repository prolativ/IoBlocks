# -*- coding: utf-8 -*-

import threading
from copernicus_helpers import get_initial_sensor_value
from copernicus_helpers import Copernicus

is_button1_pressed = get_initial_sensor_value('button1')
text_input = ""

def button1_handler(sensor_value):
  global is_button1_pressed
  is_button1_pressed = sensor_value
  print('cdcsdcsc')

def text_input_handler():
  global text_input
  while True:
    text_input = raw_input()
    print(text_input)



api = Copernicus()

api.set_handler('button1', button1_handler)
threading.Thread(target=text_input_handler).start()

api.command('subscribe', '*')

while True:
  api.listen()
