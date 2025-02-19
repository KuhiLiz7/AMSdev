
# Register your models here.
from django.contrib import admin
from .models import Tenant, Apartment, MaintenanceRequest

# Register your models here.

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('tenantid', 'firstname', 'lastname', 'email', 'phonenumber', 'apartmentid', 'movedate', 'created_at')
    search_fields = ('firstname', 'lastname', 'email', 'phonenumber')
    list_filter = ('apartmentid', 'movedate')

@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ('apartmentid', 'apartment_num', 'floor', 'building_name', 'status', 'managerid', 'ownerid')
    search_fields = ('apartment_num', 'building_name')
    list_filter = ('status', 'floor', 'building_name')

@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ('requestid', 'tenantid', 'apartmentid', 'requestdate', 'status')
    search_fields = ('tenantid__firstname', 'tenantid__lastname', 'apartmentid__apartment_num')
    list_filter = ('status', 'requestdate')