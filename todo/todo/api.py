from django.conf.urls import url

from bucketlist.api import BucketlistList, BucketlistDetail
from bucketlist.api import BucketlistItemList, BucketlistItemDetail



urlpatterns = [
    url(r'auth/login/', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^bucketlists/$', BucketlistList.as_view()),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', BucketlistDetail.as_view()),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/$', BucketlistItemList.as_view()),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/(?P<pk>[0-9]+)$', BucketlistItemDetail.as_view())
]
