from django.contrib import admin
from .models import GuestbookEntry, Memory
from content.models import Poem

@admin.register(GuestbookEntry)
class GuestbookEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'memory')
    search_fields = ('title',)
    actions = ['add_to_poem', 'add_to_memory']

    def add_to_poem(self, request, queryset):
        for entry in queryset:
            Poem.objects.create(title=entry.title, content=entry.memory)
        self.message_user(request, "Добавлено в стихи")

    add_to_poem.short_description = "Добавить выбранное в стихи"

    def add_to_memory(self, request, queryset):
        for entry in queryset:
            Memory.objects.create(title=entry.title, memory=entry.memory, photo=entry.photo)
        self.message_user(request, "Добавлено в воспоминания")

    add_to_memory.short_description = "Добавить выбранное в воспоминания"

@admin.register(Memory)
class MemoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'memory', 'approved')
    search_fields = ('title', 'approved')
