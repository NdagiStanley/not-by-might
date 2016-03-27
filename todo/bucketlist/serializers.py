from rest_framework import serializers

from models import Bucketlist, BucketlistItem


class BucketlistItemSerializer(serializers.ModelSerializer):
    """docstring for BucketlistItemSerializer"""
    class Meta:
        model = BucketlistItem
        fields = ('bucketlist', 'id', 'title', 'done', 'date_created', 'date_modified')


class BucketlistSerializer(serializers.ModelSerializer):
    """docstring for BucketlistSerializer"""

    class Meta:
        model = Bucketlist
        fields = ('id', 'name', 'items', 'date_created', 'date_modified', 'created_by')

        read_only_fields = ('items')
