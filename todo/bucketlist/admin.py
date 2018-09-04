from django.contrib import admin

from .models import Bucketlist, BucketlistItem

admin.site.register(Bucketlist)
admin.site.register(BucketlistItem)
