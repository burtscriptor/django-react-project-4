from django.db import models
from django.contrib.auth.models import User


class Session(models.Model):
    
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20)
    comments = models.CharField(max_length=200, 
                                blank=True )   
    
    def __str__(self):
        return f'{self.created_at} {self.comments} {self.type} {self.id}'


class Climb(models.Model): 
    session = models.ForeignKey(Session, on_delete=models.CASCADE)      
    climber = models.ForeignKey(User, on_delete=models.CASCADE)
    lead = models.BooleanField(default=False)
    project_send_attempt = models.BooleanField(default= False) 
    sent = models.BooleanField(default= False)
    rests = models.IntegerField()                              
    grade = models.IntegerField()                
    style = models.CharField(max_length=50)
    comments = models.CharField(max_length=200, blank=True)
    
   
    
    def __str__(self):
        return f'{self.climber.username} - {self.grade}'

    



