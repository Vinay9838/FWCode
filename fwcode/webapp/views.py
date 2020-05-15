from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from .forms import ArticleCodeSnippetForm,ArticleSubHeadingForm,ArticleHeadingForm
from django.contrib import messages
from django.views import View
from .models import ArticleHeading,ArticleSubHeading,ArticleCodeSnippet,Languages


def home(request):
    heading = ArticleHeading.objects.all()
    return render(request,'webapp/home.html',{'heading':heading})


class NewPost(View):
    context={}

    def get(self,request):
        heading_form =ArticleHeadingForm()
        snippet_form = ArticleCodeSnippetForm()
        sub_heading_form = ArticleSubHeadingForm()
        self.context['heading_form'] = heading_form
        self.context['snippet_form'] = snippet_form
        self.context['sub_heading_form'] = sub_heading_form
        return render(request,'webapp/new_post.html',self.context)

    def post(self,request):
        heading_form = ArticleHeadingForm(request.POST)
        snippet_form = ArticleCodeSnippetForm(request.POST)
        subheading_form = ArticleSubHeadingForm(request.POST)
        subheading = None
        if heading_form.is_valid():
            heading=heading_form.save(commit=False)
            heading.created_by = request.user
            heading.save()
            messages.success(request,'Heading Added Successfully')
        else:
            messages.error(request,heading_form.errors)

        if subheading_form.is_valid():
            print('come')
            subheading = subheading_form.save(commit=False)
            subheading.created_by = request.user
            subheading.save()
            messages.success(request, 'Heading Added Successfully')
        else:
            messages.error(request, subheading_form.errors)

        if snippet_form.is_valid():
            snippet = snippet_form.save(commit=False)
            snippet.subheading = subheading
            snippet.save()
            messages.success(request, 'Heading Added Successfully')
        else:
            messages.error(request, snippet_form.errors)

        return render(request, 'webapp/new_post.html', self.context)


def post_detail(request,pk):
    heading = get_object_or_404(ArticleHeading,pk=pk)
    subheading = ArticleSubHeading.objects.filter(heading=heading)
    code = ArticleCodeSnippet.objects.all()
    context={
        'heading':heading,
        'subheading':subheading,
        'code':code
    }
    return render(request,'webapp/post_detail.html',context)


