from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    
    
class ClassOffering(models.Model):
    crn = models.BigIntegerField()
    subject = models.CharField(max_length=4)
    course = models.CharField(max_length=4)
    INSM_Code = models.CharField(max_length=4)
    schedule_Code =models.CharField(max_length=3)
    description =  models.CharField(max_length=32)
    Hrs = models.IntegerField()
    Start_Date = models.DateField()
    Days = models.CharField()
    Begin_Time = models.TimeField()
    End_Time = models.TimeField()    
    Building = models.ForeignKey()
    Room= models.CharField(max_length=3)
    Instructor = models.ForeignKey()
    Available_seats = models.IntegerField()
    Total_Seats = models.IntegerField()

