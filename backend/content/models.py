from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'

    def __str__(self):
        return self.description




