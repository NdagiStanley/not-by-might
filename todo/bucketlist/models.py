from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Bucketlist(models.Model):
    name = models.CharField(max_length=20)
    created_by = models.ForeignKey(User, related_name="bucketlists")
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return '<Bucketlist {}>'.format(self.name)


class BucketlistItem(models.Model):
    title = models.CharField(max_length=30)
    bucketlist = models.ForeignKey(Bucketlist, related_name="items")
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return '<Item {}>'.format(self.title)
