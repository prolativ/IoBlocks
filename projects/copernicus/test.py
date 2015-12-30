temperatures_list= [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 100]
print temperatures_list

if not (not len(temperatures_list)):
  max2 = temperatures_list[0]
  min2 = temperatures_list[0]
  sum2 = 0
  for i in temperatures_list:
    if i > max2:
      max2 = i
    if i < min2:
      min2 = i
    sum2 = sum2 + i
  print('Maksymalna temperatura: ')
  print(max2)
  print('Minimalna temperatura: ')
  print(min2)
  print('Srednia temperatura: ')
  print(sum2 / len(temperatures_list))