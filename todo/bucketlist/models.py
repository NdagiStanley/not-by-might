from django.db import models

# Create your models here.
class Bucketlist(models.Model):
    name = models.CharField(max_length=20)
    created_by = models.CharField(max_length=20)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    #  Constructor for Bucketlist
    def __init__(self, name, created_by):
        self.name = name
        self.created_by = created_by

    def __str__(self):
        return '<Bucketlist {}>'.format(self.name)


class BucketlistItem(models.Model):
    title = models.CharField(max_length=30)
    bucketlist = models.ForeignKey(Bucketlist, related_name="items")
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    #  Constructor for BucketlistItem
    def __init__(self, title, bucketlist):
        self.title = title
        # self.bucketlist = bucketlist

    def __str__(self):
        return '<Item {}>'.format(self.title)
