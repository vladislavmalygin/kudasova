from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from content.models import Image
from memories.models import GuestbookEntry, Memory
from .serializers import (ImageSerializer, MemorySerializer,
                          GuestbookEntrySerializer)

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
            guestbook_entry_instance = serializer.save()
            # Создаем запись в модели Memory
            Memory.objects.create(
                title=guestbook_entry_instance.title,
                memory=guestbook_entry_instance.memory,
                photo=guestbook_entry_instance.photo,
                approved=False  # По умолчанию false
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def memories(request):
    if request.method == 'GET':
        approved_memories = Memory.objects.filter(approved=True)
        serializer = MemorySerializer(approved_memories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
