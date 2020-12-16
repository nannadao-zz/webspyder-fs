from django.urls import path
from .views import SearchView

urlpatterns = [
    path('all/', SearchView.as_view()),
]
