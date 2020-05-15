from django.db import models
from django.contrib.auth.models import User


class Languages(models.Model):
    """Languages Model"""
    name = models.CharField(max_length=50,unique=True)
    status = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ArticleHeading(models.Model):
    """ArticleHeading Model"""
    name = models.CharField(max_length=100)
    language = models.ForeignKey(Languages,on_delete=models.CASCADE)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.name)


class ArticleSubHeading(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000,null=True,blank=True)
    heading = models.ForeignKey(ArticleHeading,on_delete=models.CASCADE)
    status = models.IntegerField(default=0)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}|{}".format(self.heading,self.name)


class ArticleCodeSnippet(models.Model):
    subheading = models.ForeignKey(ArticleSubHeading,on_delete=models.CASCADE)
    code_snippet = models.TextField(max_length=500,null=True,blank=True)
    attachments = models.FileField(null=True, blank=True, upload_to='Article/')

    def __str__(self):
        return "{}".format(self.subheading)