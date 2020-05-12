from django import forms
from django.forms import models
from .models import Languages,ArticleCodeSnippet,ArticleHeading,ArticleSubHeading
from django_summernote.widgets import SummernoteInplaceWidget


class ArticleSubHeadingForm(models.ModelForm):
    class Meta:
        model = ArticleSubHeading
        fields = ['name','description','heading']
        widgets = {
            'description': SummernoteInplaceWidget(),
        }


class ArticleCodeSnippetForm(models.ModelForm):
    class Meta:
        model = ArticleCodeSnippet
        fields = ['subheading','code_snippet','attachments']
        widgets = {
            'code_snippet': SummernoteInplaceWidget(),
        }
