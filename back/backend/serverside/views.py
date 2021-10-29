from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def regions(request):
    return render(request, 'regions_city.html')