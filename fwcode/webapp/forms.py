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

    def __init__(self, *args, **kwargs):
        self.project = kwargs.pop('language', 0)
        super(ArticleHeadingForm, self).__init__(*args, **kwargs)
        self.fields['language'].widget.attrs['class'] = "form-control"


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

    def __init__(self, *args, **kwargs):
        self.project = kwargs.pop('heading', 0)
        super(ArticleSubHeadingForm, self).__init__(*args, **kwargs)
        self.fields['heading'].widget.attrs['class'] = "form-control"


class ArticleCodeSnippetForm(models.ModelForm):
    class Meta:
        model = ArticleCodeSnippet
        fields = ['code_snippet']
        widgets = {
            'subheading':forms.HiddenInput(),
            'code_snippet': SummernoteInplaceWidget(),
        }
