from django.contrib import admin
from django.utils.html import format_html
from .models import Image, Video


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('description', 'thumbnail')  #
    search_fields = ('description',)

    def thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.image.url)
        return "Нет изображения"

    thumbnail.short_description = 'Миниатюра'


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'file', 'created_at')
    search_fields = ('title',)
