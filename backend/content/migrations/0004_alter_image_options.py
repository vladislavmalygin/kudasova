# Generated by Django 5.1.7 on 2025-04-19 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_remove_image_url_image_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'verbose_name': 'Фотография', 'verbose_name_plural': 'Фотографии'},
        ),
    ]
