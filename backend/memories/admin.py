from django.contrib import admin
from .models import GuestbookEntry

@admin.register(GuestbookEntry)
class GuestbookEntryAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'role', 'memory')
    search_fields = ('first_name', 'last_name', 'role')
