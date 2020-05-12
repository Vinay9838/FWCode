from django.contrib import admin
from .models import Languages,ArticleSubHeading,ArticleHeading,ArticleCodeSnippet
from django_summernote.admin import SummernoteModelAdmin

# Register your models here.


class SomeModelAdmin(SummernoteModelAdmin):  # instead of ModelAdmin
    summernote_fields = '__all__'


admin.site.register(ArticleCodeSnippet)
admin.site.register(ArticleSubHeading)
admin.site.register(ArticleHeading)
admin.site.register(Languages)