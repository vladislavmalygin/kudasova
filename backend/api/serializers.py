from rest_framework import serializers

from content.models import Image, Video, Poem
from memories.models import GuestbookEntry, Memory


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ['id', 'description', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class GuestbookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestbookEntry
        fields = '__all__'


class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = '__all__'


class PoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poem
        fields = '__all__'
