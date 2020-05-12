from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from fwcode import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('webapp.urls')),
    path('summernote/', include('django_summernote.urls')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
