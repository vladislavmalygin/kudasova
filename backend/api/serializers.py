from rest_framework import serializers

from content.models import Image
from memories.models import GuestbookEntry, Memory


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'description']


class GuestbookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestbookEntry
        fields = '__all__'


class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = '__all__'