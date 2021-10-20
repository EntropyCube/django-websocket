from django.urls import re_path,path
from .consumer import weatherConsumer, dataServer, regionConsumer, cityConsumer
from serverside import consumer

websocket_urlpatterns=[
    re_path(r'ws/home/', weatherConsumer()),
    re_path(r'ws/receive_data/', dataServer()),
    re_path(r'ws/regionsCity/', regionConsumer()),
    re_path(r'ws/currentCity/', cityConsumer()),
    
]