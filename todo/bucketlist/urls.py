from django.conf.urls import url

from .views import index, account, not_found, bucketlists, bucketlist_items

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^account/$', account, name='account'),
    url(r'^404/$', not_found, name='404'),
    url(r'^bucketlists/$', bucketlists, name='bucketlists'),
    url(r'^bucketlist_items/$', bucketlist_items, name='bucketlist-items'),
]
