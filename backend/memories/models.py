from django.db import models

class GuestbookEntry(models.Model):
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия')
    role = models.CharField(max_length=100, verbose_name='Роль')
    memory = models.TextField(verbose_name='Воспоминание')
    photo = models.TextField(blank=True, null=True, verbose_name='Фото')

    class Meta:
        verbose_name = 'Запись в гостевой книге'
        verbose_name_plural = 'Записи в гостевой книге'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
