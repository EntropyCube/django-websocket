from django.db import models



class region(models.Model):
    region_name=models.CharField(max_length=100)

    def __str__(self):
        return self.region_name

class city(models.Model):
    city_name=models.CharField(max_length=100)
    region_to=models.ForeignKey(region, on_delete=models.CASCADE)

    def __str__(self):
        return self.city_name

class cityParameters(models.Model):
    temperature=models.IntegerField()
    humidity=models.IntegerField()
    wind=models.FloatField()
    atmospheric_pressure=models.IntegerField()
    time_created=models.DateTimeField(auto_now_add=True)
    city_name= models.ForeignKey(city, on_delete=models.CASCADE)
    