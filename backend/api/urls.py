from django.urls import path
from . import views

urlpatterns = [
    path('climbs/', views.ClimbListCreate.as_view(), name='climb-list'),
    path('notes/delete/<int:pk>/', views.ClimbDelete.as_view(), name='note-delete'),

    path('session/', views.SessionListCreate.as_view(), name='session-create-list'),
    path('session/<int:id>/', views.SessionDetailsList.as_view(), name='session-details'),
    
]