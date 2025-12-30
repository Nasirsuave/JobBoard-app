from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,
        blank=True
    )


    ROLE_CHOICES = (
        ('employee', 'Employee'),
        ('employer', 'Employer'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    def __str__(self):
        return f"{self.username} ({self.role})"




class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # a user who is an employee → gets one profile or employee profile cannot have multiple users
    
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20, null=True, blank=True)
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    skills = models.TextField(null=True, blank=True)
    experience = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.full_name





class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 

    company_name = models.CharField(max_length=200)
    contact_person_name = models.CharField(max_length=200)
    company_email = models.EmailField()
    company_website = models.URLField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    company_logo = models.ImageField(upload_to="company_logos/", null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    company_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.company_name


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Admin: {self.user.username}"

