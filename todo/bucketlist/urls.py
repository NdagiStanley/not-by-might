from django.conf.urls import url

from .views import index, account, bucketlists, bucketlist_items

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^account/$', account, name='account'),
    url(r'^bucketlists/$', bucketlists, name='bucketlists'),
    url(r'^bucketlist_items/$', bucketlist_items, name='bucketlist-items'),
]
