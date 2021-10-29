from django.urls import re_path
from serverside import consumer

from .consumer import weatherConsumer, dataServer, regionConsumer, cityConsumer

websocket_urlpatterns=[
    re_path(r'ws/home/', weatherConsumer()),
    re_path(r'ws/receive_data/', dataServer()),
    re_path(r'ws/regionsCity/', regionConsumer()),
    re_path(r'ws/getCityParams/', cityConsumer()),
]