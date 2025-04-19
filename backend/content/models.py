from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'

    def __str__(self):
        return self.description

class Video(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='videos/')  # Путь для хранения видеофайлов
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'

    def __str__(self):
        return self.title
