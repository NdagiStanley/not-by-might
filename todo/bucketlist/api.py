from rest_framework import generics, permissions, status
from rest_framework.response import Response

from django.contrib.auth.models import User

from bucketlist.serializers import BucketlistSerializer, BucketlistItemSerializer, UserRegisterSerializer
from bucketlist.models import Bucketlist, BucketlistItem


class UserRegisterAPIView(generics.CreateAPIView):
    """For /api/v1/auth/register url path"""
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class BucketlistList(generics.ListCreateAPIView):
    """For /api/v1/bucketlist/ url path"""
    serializer_class = BucketlistSerializer

    def get_queryset(self):
        """Return bucketlists belonging to user logged in."""

        q = self.request.query_params.get('q', None)
        user_id = self.request.user.id

        if q:
            bucketlists = Bucketlist.objects.all().filter(created_by=user_id)

            results = []

            for bucketlist in bucketlists:
                if q.lower() in bucketlist.name.lower():
                    results.append(bucketlist)

            return results
        else:
            return Bucketlist.objects.filter(created_by=user_id)



class BucketlistDetail(generics.RetrieveUpdateDestroyAPIView):
    """For /api/v1/bucketlist/<id> url path"""
    serializer_class = BucketlistSerializer

    def get_queryset(self):
        """Return bucketlists belonging to user logged in."""

        user_id = self.request.user.id
        return Bucketlist.objects.filter(created_by=user_id)


class BucketlistItemList(generics.CreateAPIView):
    """For /api/v1/bucketlist/<id>/items/ url path"""
    queryset = BucketlistItem.objects.all()
    serializer_class = BucketlistItemSerializer

    def create(self, request, **kwargs):
        pk = self.kwargs.get('pk')
        title = request.data.get('title')
        data = {
            'bucketlist': pk,
            'title': title
        }
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            item = BucketlistItem(**serializer.validated_data)
            item.save()
            return Response(
                {"message": "Item '{}' created successfully".format(title)},
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class BucketlistItemDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    """For /api/v1/bucketlist/<bucketlist-id>/items/<id> url path"""

    serializer_class = BucketlistItemSerializer

    def get_queryset(self):
        """Return items belonging to bucketlist specified on URL."""

        # Get bucketlists by logged in user
        user_id = self.request.user.id
        bucketlist_id = self.kwargs['bucketlist_id']
        bucketlist = Bucketlist.objects.filter(
            created_by=user_id, id=bucketlist_id)

        return BucketlistItem.objects.filter(bucketlist=bucketlist)

    def update(serializer, *args, **kwargs):
        user_id = serializer.request.user.id
        bucketlist_id = kwargs['bucketlist_id']
        bucketlist = Bucketlist.objects.filter(
            created_by=user_id, id=bucketlist_id)
        item = BucketlistItem.objects.filter(bucketlist=bucketlist, id=kwargs.get('pk')).first()
        if item:
            item.bucketlist = Bucketlist(pk=kwargs.get('bucketlist_id'))
            item.title = serializer.request.data.get('title', item.title)
            item.done = serializer.request.data.get('done', item.done)
            item.save()
            return Response(
                {"message": "Item '{}' updated successfully".format(item.id)},
                    status=status.HTTP_200_OK)
        return Response({"error": "You cannot update this item"},
            status=status.HTTP_404_NOT_FOUND)
