from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, guestbook_entry

router = DefaultRouter()
router.register(r'images', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('guestbook/', guestbook_entry, name='guestbook'),
]
