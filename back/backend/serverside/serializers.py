from rest_framework import serializers


class ParametersSerializer(serializers.Serializer):
    city_name= serializers.CharField()
    temperature=serializers.IntegerField()
    humidity=serializers.IntegerField()
    wind=serializers.FloatField()
    atmospheric_pressure=serializers.IntegerField()
    

class CitysSerializer(serializers.Serializer):
    pass
