#!/usr/bin/env python
# -*- coding: utf-8 -*-

from copernicus_helpers import Copernicus



api = Copernicus()


api.command('subscribe', '*')


while True:
  api.listen()
