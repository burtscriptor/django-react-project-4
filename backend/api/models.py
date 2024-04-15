from django.db import models
from django.contrib.auth.models import User



class Note(models.Model):                                       # entity name
    title = models.CharField(max_length = 100)                  # entity attributes/ fields
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes') # allows usse to use .note and give access to all note attributes

    def __str__(self):
        return f'{self.title} by {self.author}'
    
class Session(models.Model):
    type = models.CharField(max_length=1, choices=)   


# Create your models here.
