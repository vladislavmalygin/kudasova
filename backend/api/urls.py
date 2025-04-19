from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageList, guestbook_entry, memories, list_videos

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('guestbook/', guestbook_entry, name='guestbook'),
    path('images/', ImageList.as_view(), name='image-list'),
    path('memories/', memories, name='memories'),
    path('videos/', list_videos, name='list_videos'),
]

