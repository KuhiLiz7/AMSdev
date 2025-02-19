# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Tenant, Apartment, MaintenanceRequest
from .serializers import MaintenanceRequestSerializer

class TenantModelTest(TestCase):
    def setUp(self):
        self.tenant = Tenant.objects.create(
            firstname="John",
            lastname="Doe",
            email="john.doe@example.com",
            phonenumber="254712345678",
            apartmentid=Apartment.objects.create(
                apartment_num="A101",
                floor=1,
                building_name="Building A",
                status="occupied",
                managerid=1,
                ownerid=1
            ),
            movedate="2023-10-01"
        )

    def test_tenant_creation(self):
        self.assertEqual(self.tenant.firstname, "John")
        self.assertEqual(self.tenant.lastname, "Doe")
        self.assertEqual(self.tenant.email, "john.doe@example.com")
        self.assertEqual(self.tenant.phonenumber, "254712345678")
        self.assertEqual(self.tenant.apartmentid.apartment_num, "A101")

class ApartmentModelTest(TestCase):
    def setUp(self):
        self.apartment = Apartment.objects.create(
            apartment_num="A101",
            floor=1,
            building_name="Building A",
            status="occupied",
            managerid=1,
            ownerid=1
        )

    def test_apartment_creation(self):
        self.assertEqual(self.apartment.apartment_num, "A101")
        self.assertEqual(self.apartment.floor, 1)
        self.assertEqual(self.apartment.building_name, "Building A")
        self.assertEqual(self.apartment.status, "occupied")

class MaintenanceRequestModelTest(TestCase):
    def setUp(self):
        self.tenant = Tenant.objects.create(
            firstname="John",
            lastname="Doe",
            email="john.doe@example.com",
            phonenumber="254712345678",
            apartmentid=Apartment.objects.create(
                apartment_num="A101",
                floor=1,
                building_name="Building A",
                status="occupied",
                managerid=1,
                ownerid=1
            ),
            movedate="2023-10-01"
        )
        self.maintenance_request = MaintenanceRequest.objects.create(
            tenantid=self.tenant,
            apartmentid=self.tenant.apartmentid,
            description="Leaking faucet in the kitchen",
            status="pending"
        )

    def test_maintenance_request_creation(self):
        self.assertEqual(self.maintenance_request.tenantid.firstname, "John")
        self.assertEqual(self.maintenance_request.apartmentid.apartment_num, "A101")
        self.assertEqual(self.maintenance_request.description, "Leaking faucet in the kitchen")
        self.assertEqual(self.maintenance_request.status, "pending")

class MaintenanceRequestAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.tenant = Tenant.objects.create(
            firstname="John",
            lastname="Doe",
            email="john.doe@example.com",
            phonenumber="254712345678",
            apartmentid=Apartment.objects.create(
                apartment_num="A101",
                floor=1,
                building_name="Building A",
                status="occupied",
                managerid=1,
                ownerid=1
            ),
            movedate="2023-10-01"
        )
        self.maintenance_request = MaintenanceRequest.objects.create(
            tenantid=self.tenant,
            apartmentid=self.tenant.apartmentid,
            description="Leaking faucet in the kitchen",
            status="pending"
        )
        self.valid_payload = {
            "tenantid": self.tenant.tenantid,
            "apartmentid": self.tenant.apartmentid.apartmentid,
            "description": "Broken window",
            "status": "pending"
        }
        self.invalid_payload = {
            "tenantid": self.tenant.tenantid,
            "apartmentid": self.tenant.apartmentid.apartmentid,
            "description": "",
            "status": "pending"
        }

    def test_get_all_maintenance_requests(self):
        response = self.client.get(reverse('maintenance-request-list'))
        maintenance_requests = MaintenanceRequest.objects.all()
        serializer = MaintenanceRequestSerializer(maintenance_requests, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_maintenance_request(self):
        response = self.client.get(reverse('maintenance-request-detail', kwargs={'pk': self.maintenance_request.requestid}))
        maintenance_request = MaintenanceRequest.objects.get(requestid=self.maintenance_request.requestid)
        serializer = MaintenanceRequestSerializer(maintenance_request)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_maintenance_request(self):
        response = self.client.post(
            reverse('maintenance-request-list'),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_maintenance_request(self):
        response = self.client.post(
            reverse('maintenance-request-list'),
            data=self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_maintenance_request(self):
        response = self.client.put(
            reverse('maintenance-request-detail', kwargs={'pk': self.maintenance_request.requestid}),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_maintenance_request(self):
        response = self.client.delete(
            reverse('maintenance-request-detail', kwargs={'pk': self.maintenance_request.requestid})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
