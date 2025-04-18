from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from content.models import Image
from memories.models import GuestbookEntry
from .serializers import ImageSerializer

from .serializers import GuestbookEntrySerializer

class ImageList(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


@api_view(['POST'])
def guestbook_entry(request):
    if request.method == 'POST':
        data = request.data.copy()
        if 'photo' in data and data['photo']:
            if data['photo'].startswith('data:image/'):
                header, data['photo'] = data['photo'].split(';base64,')

        serializer = GuestbookEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
