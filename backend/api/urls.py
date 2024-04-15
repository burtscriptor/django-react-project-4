from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.ClimbListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.ClimbDelete.as_view(), name='note-delete'),

    path('session/', views.SessionListCreate.as_view(), name='session-create-list'),
]