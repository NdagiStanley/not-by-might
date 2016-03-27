from django.conf.urls import url

from .views import index, BucketlistList, BucketlistDetail

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^bucketlists/$', BucketlistList.as_view(), name='bucketlist-list'),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', BucketlistDetail.as_view(), name='bucketlist-detail'),
]
