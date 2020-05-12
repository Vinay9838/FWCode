from django.conf.urls.static import static
from django.urls import path
from fwcode import settings
from .views import home,NewPost

urlpatterns = [
    path('',home,name="home"),
    path('new-post/',NewPost.as_view(),name="new_post"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
