from django.db import models
from django.contrib.auth.models import User


class Session(models.Model):
    created_at = models.DateTimeField()
    type = models.CharField(max_length=20)
    comments = models.CharField(max_length=200, 
                                blank=True )   
    
    def __str__(self):
        return f'{self.created_at} {self.comments} {self.type}'


class Climb(models.Model):       
    climber = models.ForeignKey(User, on_delete=models.CASCADE)
    lead = models.BooleanField(default=False)
    project_send_attempt = models.BooleanField(default= False) 
    sent = models.BooleanField(default= False)
    rests = models.IntegerField()                              
    grade = models.IntegerField()                
    style = models.CharField(max_length=50)
    comments = models.CharField(max_length=200, blank=True)
   
    
    def __str__(self):
        return f'{self.grade} {self.get_style_display()}' # by {self.session.climber}'
    



