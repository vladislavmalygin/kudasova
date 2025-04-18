from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageList, guestbook_entry

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('guestbook/', guestbook_entry, name='guestbook'),
    path('images/', ImageList.as_view(), name='image-list'),
]
