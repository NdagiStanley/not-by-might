from django.conf.urls import url

from .views import index, app, BucketlistList, BucketlistDetail, BucketlistItemDetail, BucketlistItemList

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^app/$', app, name='app'),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', BucketlistDetail.as_view(), name='bucketlist-detail'),
    url(r'^bucketlists/(?P<list>[0-9]+)/items/(?P<pk>[0-9]+)$', BucketlistItemDetail.as_view(), name='bucketlist-detail'),
]
