
# Create your views here.
from rest_framework import generics
from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer

class MaintenanceRequestListCreateView(generics.ListCreateAPIView):
    queryset = MaintenanceRequest.objects.all()
    serializer_class = MaintenanceRequestSerializer

class MaintenanceRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MaintenanceRequest.objects.all()
    serializer_class = MaintenanceRequestSerializer