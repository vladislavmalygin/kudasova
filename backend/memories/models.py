from django.db import models

class GuestbookEntry(models.Model):
    title = models.CharField(max_length=100, verbose_name='title')
    memory = models.TextField(verbose_name='Воспоминание')
    photo = models.TextField(blank=True, null=True, verbose_name='Фото')

    class Meta:
        verbose_name = 'Запись в гостевой книге'
        verbose_name_plural = 'Записи в гостевой книге'

    def __str__(self):
        return f"{self.title}"
