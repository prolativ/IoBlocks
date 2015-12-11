#!/usr/bin/env python
# -*- coding: utf-8 -*-

from copernicus_helpers import Copernicus


for count in range(10):
  print(0 == 0)
  print('Hello')

api = Copernicus()

api.command('subscribe', '*')

while True:
  api.listen()
