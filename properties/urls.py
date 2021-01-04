from django.urls import path
from .views import SearchView, SortView, HotelNamesView, DashboardView

urlpatterns = [
    path('all/', SearchView.as_view()),
    path('sorted/', SortView.as_view()),
    path('hotels/', HotelNamesView.as_view()),
    path('dashboard/', DashboardView.as_view())
]
