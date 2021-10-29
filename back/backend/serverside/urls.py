from django.urls import path

from . import views

urlpatterns=[
    path('api/regionscitydata/',views.GetRegionsCitysParameters.as_view()),
]