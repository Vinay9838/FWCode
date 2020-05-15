from django import forms
from django.forms import models
from .models import Languages,ArticleCodeSnippet,ArticleHeading,ArticleSubHeading
from django_summernote.widgets import SummernoteInplaceWidget


class ArticleHeadingForm(models.ModelForm):
    class Meta:
        model = ArticleHeading
        fields = ['name','language']
        widgets = {
            'name': forms.widgets.TextInput(attrs={'class': 'form-control'}),
        }


class ArticleSubHeadingForm(models.ModelForm):
    class Meta:
        model = ArticleSubHeading
        fields = ['name','description','heading']
        widgets = {
            'name':forms.widgets.TextInput(attrs={'class': 'form-control'}),
            'description': SummernoteInplaceWidget(),
        }
        labels = {
            'name': 'Subheading'

        }


class ArticleCodeSnippetForm(models.ModelForm):
    class Meta:
        model = ArticleCodeSnippet
        fields = ['code_snippet']
        widgets = {
            'code_snippet': SummernoteInplaceWidget(),
        }
