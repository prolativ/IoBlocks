# -*- coding: utf-8 -*-

from copernicus_helpers import Copernicus


api.command('rgb', '#ffffff')

api = Copernicus()

api.command('subscribe', '*')

while True:
  api.listen()
