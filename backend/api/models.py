from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    title= models.CharField(max_length=100)

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    category=models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/")
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")

    def __str__(self):
        return self.title