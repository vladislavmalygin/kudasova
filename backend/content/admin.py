from django.contrib import admin

from .models import Image

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('description',)
    search_fields = ('description',)

