import json,random,time
from datetime import datetime
from channels.generic.websocket import JsonWebsocketConsumer, AsyncWebsocketConsumer
from .models import city,region,cityParameters
from asgiref.sync import async_to_sync,sync_to_async
from channels.db import database_sync_to_async
import asyncio


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
        self.close()

    @sync_to_async
    def get_all_regions(self):
        return region.objects.all().values('region_name')

    

class regionConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.connected=True
        await self.accept()
        # while self.connected:
        #     time.sleep(2)
        #     await self.send_regs()
        
        

    async def disconnect(self,code):
        self.connected=False
        await self.close()
        
        
    async def receive(self, text_data):
        print(self.connected)
        print(text_data=="")
        print("nam prishel region==",text_data)
        if (text_data!="" and self.connected):
            current_region=json.loads(text_data)
            time.sleep(1)
            while self.connected:
                # await asyncio.sleep(2)
                time.sleep(2)
                print(current_region['current_region'])
                await self.send_regs(current_region['current_region'])
        

    async def send_regs(self,cur_reg):
        region_id=await self.get_cur_reg_id(cur_reg)
        # region_id=await self.get_cur_reg_id()
        region_id=region_id[0]
        citys=await self.get_cur_reg_citys(region_id)
        data=[]
        for i in range(1):
            for c in citys:
                cp=await self.get_city_params(c)
                data.append([{'city_data':{'city_name':str(c),'temperature':cp.temperature,'humidity':cp.humidity,'wind':cp.wind,'atmospheric_pressure':cp.atmospheric_pressure}}])
            await self.send(json.dumps({"regions_city_data":data}))
    
    @sync_to_async
    def get_cur_reg_id(self,cur_reg):
        return region.objects.filter(region_name=cur_reg).values('id')
    # @sync_to_async
    # def get_cur_reg_id(self):
    #     return region.objects.filter(region_name="Липецкая область").values('id')

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
        await self.close()
        

    async def receive(self,text_data):
        if (text_data!=""):
            charts_params=json.loads(text_data)
            time.sleep(2)
            await self.send_chart_data(charts_params[0]['city'],charts_params[1]['parameter'])

    async def send_chart_data(self,current_city,param):
        city_id=await self.get_cur_city_id(current_city)
        city_id=city_id[0]['id']
        chartData=[[],]
        tmp=await self.get_cur_city_params(city_id,param)
        tmp=list(tmp)
        buf=[]
        for el in (tmp):
            buf.append(el['time_created'].strftime("%m/%d/%Y"))
        uniqueSetDate=set(buf)
        listuniqueSetDate=list(uniqueSetDate)
        for date in (listuniqueSetDate):
            filtered=list(filter(lambda el:el['time_created'].strftime("%m/%d/%Y")==date,tmp))
            filtredListParam=[]
            for el in (filtered):
                filtredListParam.append(el[param])
            chartData[0].append(round(sum(filtredListParam)/len(filtredListParam),2))
        chartData.append(listuniqueSetDate)
        print(chartData)
        # массив уникальных дат и по датам потом посчитать среднее     
            
        await self.send(json.dumps({"city_chart_data":chartData}))
       
    @sync_to_async
    def get_cur_city_id(self,cur_c):
        return city.objects.filter(city_name=cur_c).values('id')
    
    @sync_to_async
    def get_cur_city_params(self,city_id,param):
        return cityParameters.objects.filter(city_name_id=city_id).values(param,'time_created')


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