from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from .models import Bucketlist, BucketlistItem
from .serializers import BucketlistSerializer
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

def index(request):
    return HttpResponse("This is the 'It's not by Might API")


class BucketlistList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist_list.html'

    def get(self, request):
        queryset = Bucketlist.objects.all()
        return Response({'bucketlists': queryset})


class BucketlistDetail(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'bucketlist_detail.html'

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
