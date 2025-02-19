from rest_framework import serializers
from .models import Tenant, Apartment, MaintenanceRequest

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'

class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = '__all__'

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    tenantid = TenantSerializer(read_only=True)  # Nested serializer for tenant details
    apartmentid = ApartmentSerializer(read_only=True)  # Nested serializer for apartment details

    class Meta:
        model = MaintenanceRequest
        fields = '__all__'

    def validate_description(self, value):
        """
        Custom validation for the description field.
        Ensures the description is not empty.
        """
        if not value.strip():
            raise serializers.ValidationError("Description cannot be empty.")
        return value

    def validate_status(self, value):
        """
        Custom validation for the status field.
        Ensures the status is either 'pending' or 'resolved'.
        """
        if value not in ['pending', 'resolved']:
            raise serializers.ValidationError("Status must be either 'pending' or 'resolved'.")
        return value