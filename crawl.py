import json
import time
import random
import requests
from bs4 import BeautifulSoup

CNUM = '零一二三四五六七八九十'

url = 'http://web.hshs.ntpc.edu.tw/pkvsweb/faclas2.asp'
headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
}


schedules = {}
cs = set()

for grade in [3]:
  for group in range(1, 11):
    cls = f'{grade}{group:02d}'
    classname = f'{CNUM[grade]}年{CNUM[group]}班'
    print(classname)

    data = {'tname': classname.encode('big5')}
    req = requests.post(url, data=data, headers=headers)
    soup = BeautifulSoup(req.content, 'lxml')

    schedules[cls] = []
    trs = soup.find_all('tr')

    for i in range(2, len(trs), 2):
      classes = trs[i].find_all('td')
      teachers = trs[i+1].find_all('td')
      schedules[cls].append([])
      for j in range(1, 6):
        c = classes[j].text
        t = teachers[j].text
        if c == '.':
          c = ''
        if t == '.':
          t = ''
        cs.update((c, t))
        schedules[cls][-1].append([c, t] if c and t else [])
    time.sleep(1)

cs = list(cs)
random.shuffle(cs)

for cls in schedules.keys():
  if cls == 'cs':
      continue
  for i in range(len(schedules[cls])):
    for j in range(len(schedules[cls][i])):
      if len(schedules[cls][i][j]) == 0:
        c, t = 0, 0
      else:
        c = cs.index(schedules[cls][i][j][0])
        t = cs.index(schedules[cls][i][j][1])
      schedules[cls][i][j] = (c << 8)+t

with open('schedule.js', 'w', encoding='utf-8') as file:
  file.write('const cs=')
  json.dump(cs, file, ensure_ascii=False)
  file.write(',sc=')
  json.dump(schedules, file, ensure_ascii=False)
  file.write(';')
