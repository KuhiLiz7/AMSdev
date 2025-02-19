
# Create your models here.
from django.db import models

class Tenant(models.Model):
    tenantid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField()
    phonenumber = models.CharField(max_length=15)
    apartmentid = models.ForeignKey('Apartment', on_delete=models.CASCADE)
    movedate = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class Apartment(models.Model):
    apartmentid = models.AutoField(primary_key=True)
    apartment_num = models.CharField(max_length=10)
    floor = models.IntegerField()
    building_name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[('available', 'Available'), ('occupied', 'Occupied')])
    managerid = models.ForeignKey('Manager', on_delete=models.CASCADE)  # Reference the Manager model
    ownerid = models.ForeignKey('Owner', on_delete=models.CASCADE)  # Reference the Owner model

    def __str__(self):
        return f"{self.apartment_num} - {self.building_name}"

class MaintenanceRequest(models.Model):
    requestid = models.AutoField(primary_key=True)
    tenantid = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    apartmentid = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    requestdate = models.DateField(auto_now_add=True)
    description = models.TextField()
    image = models.ImageField(upload_to='maintenance_images/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('resolved', 'Resolved')])

    def __str__(self):
        return f"Request {self.requestid} by {self.tenantid}"

class Manager(models.Model):
    managerid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField()
    phonenumber = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class Owner(models.Model):
    ownerid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField()
    phonenumber = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    