import json,random,time
from channels.generic.websocket import JsonWebsocketConsumer, AsyncWebsocketConsumer
from .models import city,region,cityParameters
from asgiref.sync import async_to_sync,sync_to_async
from channels.db import database_sync_to_async

class weatherConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        regs_name=await self.get_all_regions()
        regs=[]
        for r in regs_name:
            regs.append(r['region_name'])
        regs_data=json.dumps({"regions":regs})
        await self.send(regs_data)
    
    async def disconnect(self,code):
        pass

    @sync_to_async
    def get_all_regions(self):
        return region.objects.all().values('region_name')

    

class regionConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.connected=True
        await self.accept()
        while self.connected:
            time.sleep(1)
            await self.send_regs()
        

    async def disconnect(self,code):
        self.connected=False
        await self.close()
        
        

    async def receive(self, text_data):
        pass

    async def send_regs(self):
        region_id=await self.get_cur_reg_id()
        region_id=region_id[0]
        citys=await self.get_cur_reg_citys(region_id)
        data=[]
        for i in range(1):
            for c in citys:
                cp=await self.get_city_params(c)
                data.append([{'city_data':{'city_name':str(c),'temperature':cp.temperature,'humidity':cp.humidity,'wind':cp.wind,'atmospheric_pressure':cp.atmospheric_pressure}}])
            await self.send(json.dumps({"regions_city_data":data}))
    
    @sync_to_async
    def get_cur_reg_id(self):
        return region.objects.filter(region_name="Липецкая область").values('id')

    @sync_to_async
    def get_cur_reg_citys(self,reg_id):
        return city.objects.filter(region_to_id=reg_id['id'])
    
    @sync_to_async
    def get_city_params(self,city):
        return cityParameters.objects.filter(city_name=city).latest('time_created')
            
            
            
class cityConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

    async def disconnect(self):
        pass

    async def receive(self,event):
        pass

    def send(self):
        pass


class dataServer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self,text_data):
        value=json.loads(text_data)
        c = await self.get_all_city()
        cp=cityParameters(temperature=value['temperature'],humidity=value['humidity'],wind=value['wind'],atmospheric_pressure=value['atmospheric_pressure'],city_name=random.choice(c))
        await database_sync_to_async(cp.save)()
    
    @sync_to_async
    def get_all_city(self):
        return city.objects.all()