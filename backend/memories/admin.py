from django.contrib import admin
from .models import GuestbookEntry

@admin.register(GuestbookEntry)
class GuestbookEntryAdmin(admin.ModelAdmin):
    list_display = ('title','memory')
    search_fields = ('title',)
