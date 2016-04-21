from django.shortcuts import get_object_or_404, render

from django.contrib.auth.models import User

from .models import Bucketlist, BucketlistItem
from .serializers import BucketlistSerializer, UserRegisterSerializer
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


def index(request):
    return render(request, 'index.html')

def app(request):
    return render(request, 'app.html')


class BucketlistList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist.html'

    def get(self, request):
        queryset = Bucketlist.objects.all()
        return Response({'bucketlists': queryset})


class BucketlistDetail(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist.html'

    def get(self, request, pk):
        bucketlist = get_object_or_404(Bucketlist, pk=pk)
        serializer = BucketlistSerializer(bucketlist)
        return Response({'serializer': serializer, 'bucketlist': bucketlist})

    def post(self, request, pk):
        bucketlist = get_object_or_404(Bucketlist, pk=pk)
        serializer = BucketlistSerializer(bucketlist, data=request.data)
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'bucketlist': bucketlist})
        serializer.save()
        return redirect('bucketlist-list')

class BucketlistItemList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist_itemlist.html'


    def post(self, request, pk):
        bucketlist = get_object_or_404(Bucketlist, pk=pk)
        serializer = BucketlistSerializer(bucketlist, data=request.data)
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'bucketlist': bucketlist})
        serializer.save()
        return redirect('bucketlist-list')


class BucketlistItemDetail(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist_item.html'

    def get(self, request, list, pk):
        bucketlist = get_object_or_404(Bucketlist, pk=pk)
        serializer = BucketlistSerializer(bucketlist)
        return Response({'serializer': serializer, 'bucketlist': bucketlist})

    def post(self, request, pk):
        bucketlist = get_object_or_404(Bucketlist, pk=pk)
        serializer = BucketlistSerializer(bucketlist, data=request.data)
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'bucketlist': bucketlist})
        serializer.save()
        return redirect('bucketlist-list')
