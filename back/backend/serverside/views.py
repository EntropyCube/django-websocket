from django.shortcuts import render

# Create your views here.

def index(request):
    context={'regions_name':'a'}
    return render(request, 'index.html',context)

def regions(request):
    context={'regions_name':'a'}
    return render(request, 'regions_city.html',context)