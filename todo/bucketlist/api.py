from rest_framework import generics, permissions

from serializers import BucketlistSerializer, BucketlistItemSerializer
from models import Bucketlist, BucketlistItem

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
