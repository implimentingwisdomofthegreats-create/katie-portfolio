from django.urls import path

from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('add-subject/', views.add_subject, name='add_subject'),
    path('subject/<int:pk>/', views.subject_detail, name='subject_detail'),
    path('subject/<int:pk>/add-topic/', views.add_topic, name='add_topic'),
    path('subject/<int:pk>/delete/', views.delete_subject, name='delete_subject'),
    path('subject/<int:subject_pk>/topic/<int:pk>/delete/', views.delete_topic, name='delete_topic'),
]
