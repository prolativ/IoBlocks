#!/usr/bin/env python
# -*- coding: utf-8 -*-

import threading
from copernicus_helpers import Copernicus

text_input = ""

def text_input_handler():
  global text_input
  while True:
    text_input = raw_input()
    print(text_input)



api = Copernicus()

threading.Thread(target=text_input_handler).start()

api.command('subscribe', '*')

while True:
  api.listen()
