from django.contrib import admin
from .models import GuestbookEntry, Memory

@admin.register(GuestbookEntry)
class GuestbookEntryAdmin(admin.ModelAdmin):
    list_display = ('title','memory')
    search_fields = ('title',)



@admin.register(Memory)
class GuestbookEntryAdmin(admin.ModelAdmin):
    list_display = ('title','memory','approved')
    search_fields = ('title', 'approved')