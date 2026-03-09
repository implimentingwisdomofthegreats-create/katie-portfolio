from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('learning.urls')),
    path('', include('portfolio.urls')),
]
