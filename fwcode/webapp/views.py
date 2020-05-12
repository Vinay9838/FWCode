from django.shortcuts import render
from django.http import HttpResponse
from .forms import ArticleCodeSnippetForm,ArticleSubHeadingForm
# Create your views here.
from django.views import View


def home(request):
    return render(request,'webapp/home.html')


class NewPost(View):
    context={}

    def get(self,request):
        snippet_form = ArticleCodeSnippetForm()
        sub_heading_form = ArticleSubHeadingForm()
        self.context['snippet_form'] = snippet_form
        self.context['sub_heading_form'] = sub_heading_form
        return render(request,'webapp/new_post.html',self.context)

