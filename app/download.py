import urllib.request
import os
import shutil
import ssl

urls = {
  'hero.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC48uH1KcTVbXOq2FJ3uGlPtATyp5oY8Z7SHsCKD4amQpxjJvuy8gFpKPcWi363R2oH_S7o4rZJFrcMzmlpvBvhGCDV-OjKWklI8LOiWm0UgbFZFk-QJU4q9oZTHEqwjPrKSTbTsTU3WwoyO0xzx0mGZ_C6ahEc_Hx2J22dp6-oWxYiinN_5un6DlUcLgI33EcnzfEdGdcS85oLorNOImIXfESAcTr9yfTJ4bI8zvOkIJ7FbSaNKbSFd6cU4O16t8j2VQ8KTjz1Gwg',
  'gallery-1.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuClVM2QzEfrkfW1GNsit0TJrSga7MMovPJ_EEQJc5VFd2A1mif7HSKxGqaxFXgazcGjR3ArN9gWTpejv3D7hxaYufNMI6BcBWq-lPUI5GGcm7Na4OpbZXPnc9FIudGhACS9L8Yc88-Ab-aOadiwSj4e6a1YRQtIxrpypP1Lz-3d0TBmyZlJ94KPuPhIzVcegZqeI7E1yh-jPprqnZEyhO6h2XQM5bWDLGPyVIKAmO8QT6hpRuKTXViZAhHkRLU5hdfbNAUejCCKhzQ',
  'gallery-2.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwosEiXK6pbfKuCwdheNw1LdVQuzw7Q7ZyjRA5z15wetphqwKFic14ogREbu3mRJM9O23DpPb8FlXtXwGca47tct6p2o9JDU3ds3k4tYUw4LSKUH6Qqz99-IV4M-fOUki2zDkMCDNWujwhw3hVCH17Gdg16ZdbvLbEPKrz5M6xc1RwTXZCkk4pkFJQhSGWfqqMZSUnD9Lef7OhQnWjGIz7arhBu418DzGdjnSiI_YWBRboTpd55Reyfrk7MthmT5L_6YGBJ6hCn78',
  'gallery-3.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQpYQFfjqdWqicEhasVH67p4mmzD3G5Dn-giqMD9Pm2kq6Lj3JiJMj6YCicEhstgr4imS1sBg84Rfwg7ZXxwMAmCnK0Gs2wlbfZvKeLtouGMd5kAddEipeL9XWayev6YF7DqdKj8d0HeF-fxLf4UhXy_qJFZHxLlJt1rNVWlEsm-9xRUcWVBlpMa8wWzXfdBTVXwIA0QKMQgk5HFVd3L3ALkgraShndPlhXkeRvMClxTWW5CoTv4mIAD_G1eyHpBA-5u1PJclHndA',
  'gallery-4.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYqjcjt3UZ8yrCYHzQGdQwuqBgjqZFFHLchTDhNtTha8KDKzgNJ9H8xaz2T03w7W7pxTe5XUjUzd33Z73SJ2C5VKlO_Q20DUuQRiqZYUdHxvdhY-32hUtviJ_3XWqVI2GRu7BE49UF_F-OI_mkLFZ0WbWSYEOSqLxeQ5HLiqO6HCjYEb5vT2sgbS1JEDaFCTKqNG9h7PQ341FS4fDEEFMOSmNR8IrdU4BLNwsUAJwpBfpT3WgP-PomzK_GZuriiby47duT1hCAg8U'
}

dest_dir = r"c:\MY PROJECTS\Wedding Invitation\app\public\assets\images"
os.makedirs(dest_dir, exist_ok=True)

ssl._create_default_https_context = ssl._create_unverified_context

for name, url in urls.items():
    print(f'Downloading {name}...')
    urllib.request.urlretrieve(url, os.path.join(dest_dir, name))

shutil.copy(os.path.join(dest_dir, 'hero.jpg'), os.path.join(dest_dir, 'hero2.jpg'))
for i in range(1, 5):
    shutil.copy(os.path.join(dest_dir, f'gallery-{i}.jpg'), os.path.join(dest_dir, f'gallery-{i+4}.jpg'))
print('Done copying!')
