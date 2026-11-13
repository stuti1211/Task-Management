from django.urls import path
from . import views

urlpatterns = [
  
  path('',views.home,name='home'),
  path('list/',views.task_list, name='task_list'),
  path('<int:id>/', views.task_detail, name='task_detail'),
  path('create/', views.create_task, name='create_task'),
  path('update/<int:id>', views.update_task, name='update_task'),
  path('delete/<int:id>', views.delete_task, name='delete_task'),
  path('api/', views.api_task_list, name='api_task_list'),
  path('api/create/', views.api_create_task, name='api_create_task'),
  path('api/update/<int:id>', views.api_update_task, name='api_update_task'),
  path('api/delete/<int:id>',views.api_delete_task,name='api_delete_task'),
  path('api/partial-update/<int:id>/', views.api_partial_update_task),
  path('api/signup/', views.api_signup, name='api_signup'),
  path('api/login/', views.api_login, name='api_login'),
]

