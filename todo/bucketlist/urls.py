from django.conf.urls import url

from .views import index, app, BucketlistDetail, BucketlistItemDetail

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^app/$', app, name='app'),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', BucketlistDetail.as_view(), name='bucketlist'),
    url(r'^bucketlists/(?P<list>[0-9]+)/items/(?P<pk>[0-9]+)$', BucketlistItemDetail.as_view(), name='bucketlist-item'),
]
