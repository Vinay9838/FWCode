from django.conf.urls.static import static
from django.urls import path
from fwcode import settings
from .views import home,NewPost,post_detail,new_heading,new_snippet,img2pdf

urlpatterns = [
    path('',home,name="home"),
    path('new-post/',NewPost.as_view(),name="new_post"),
    path('new-post/snippet/',new_snippet,name="new_snippet"),
    path('new-post/new-heading/',new_heading,name="new_heading"),
    path('post-detail/<int:pk>/',post_detail,name="post_detail"),
    path('convert-pdf',img2pdf,name="img2pdf")

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
