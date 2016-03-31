from rest_framework import serializers

from django.contrib.auth.models import User

from models import Bucketlist, BucketlistItem


class UserRegisterSerializer(serializers.ModelSerializer):
    """User serializer"""

    class Meta:
        model = User

        # Note that id is non-updatable, therefore not required in the read-only fields
        fields = ('id', 'username', 'password', 'email',)

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


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
