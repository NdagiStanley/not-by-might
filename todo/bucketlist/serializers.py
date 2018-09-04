from rest_framework import serializers

from django.contrib.auth.models import User

from bucketlist.models import Bucketlist, BucketlistItem


class UserRegisterSerializer(serializers.ModelSerializer):
    """User serializer"""

    # This field is not tied to any model. It is for server side authentication
    confirm_password = serializers.CharField(
        max_length=32, required=False, write_only=True)

    class Meta:
        model = User

        # Note that id is non-updatable, therefore not required in the read-only fields
        fields = ('id', 'username', 'password', 'confirm_password', 'email',)

    def create(self, validated_data):
        password = validated_data.get('password')
        confirm_password = validated_data.get('confirm_password')
        if password and confirm_password and password == confirm_password:
            user = User(
                email=validated_data['email'],
                username=validated_data['username'],
            )
            user.set_password(validated_data['password'])
            user.save()
            return user
        raise serializers.ValidationError("Password and confirm_password don't tally")


class BucketlistItemSerializer(serializers.ModelSerializer):
    """docstring for BucketlistItemSerializer"""
    class Meta:
        model = BucketlistItem
        fields = ('bucketlist', 'id', 'title', 'done', 'date_created', 'date_modified')

        read_only_fields = ('bucketlist')


class BucketlistSerializer(serializers.ModelSerializer):
    """docstring for BucketlistSerializer"""

    class Meta:
        model = Bucketlist
        fields = ('id', 'name', 'items', 'date_created', 'date_modified', 'created_by')

        read_only_fields = ('items', 'created_by')

    def create(self, validated_data):
        bucketlist = Bucketlist(
            name=validated_data['name'],
            created_by=self.context.get('request').user,
            )
        bucketlist.save()
        return bucketlist
