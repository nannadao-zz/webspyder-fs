from django.urls import path
from .views import SearchView, SortView

urlpatterns = [
    path('all/', SearchView.as_view()),
    path('sorted/', SortView.as_view())
]
