from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Expenses(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=False)
    nameexp = models.CharField(max_length=50,blank=False)
    amountexp = models.IntegerField(blank=False)
    typeexp= models.CharField(max_length=50,blank=False)
    timestap = models.DateField(auto_now_add=True)
    def serialize(self):
        return {
            "id": self.id,
            "nameexp":self.nameexp,
            "amountexp": self.amountexp,
            "typeexp": self.typeexp,
            "timestamp":self.timestap,
        }