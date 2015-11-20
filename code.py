from copernicus import Copernicus

api = Copernicus()

old_light = None
new_light = None


def light_handler():
  print('aaaa')

api.set_handler('light', light_handler)

print('bbb')


while True:
    api.listen()
