from rest_framework import generics, permissions

from django.contrib.auth.models import User

from serializers import BucketlistSerializer, BucketlistItemSerializer, UserRegisterSerializer
from models import Bucketlist, BucketlistItem


class UserRegisterAPIView(generics.CreateAPIView):
    """For /api/v1/auth/register url path"""
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class BucketlistList(generics.ListCreateAPIView):
    """For /api/v1/bucketlist/ url path"""
    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer


class BucketlistDetail(generics.RetrieveUpdateDestroyAPIView):
    """For /api/v1/bucketlist/<id> url path"""
    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer


class BucketlistItemList(generics.CreateAPIView):
    """For /api/v1/bucketlist/<id>/items/ url path"""
    queryset = BucketlistItem.objects.all()
    serializer_class = BucketlistItemSerializer


class BucketlistItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """For /api/v1/bucketlist/<id>/items/<item-id> url path"""
    queryset = BucketlistItem.objects.all()
    serializer_class = BucketlistItemSerializer
