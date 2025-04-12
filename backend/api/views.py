from rest_framework import viewsets
from content.models import Image
from .serializers import ImageSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

