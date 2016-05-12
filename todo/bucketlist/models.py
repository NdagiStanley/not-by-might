from django.db import models
from django.contrib.auth.models import User

class Bucketlist(models.Model):
    name = models.CharField(max_length=20)
    created_by = models.ForeignKey(User, related_name="bucketlists")
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return '<Bucketlist {}>'.format(self.name)

    @property
    def items(self):
        bucketlist_items = []
        for item in self.bl_items.all():
            bucketlist_items.append(
                {'id': item.id,
                 'title': item.title,
                 'date_created': item.date_created,
                 'date_modified': item.date_modified,
                 'done': item.done})
        return bucketlist_items

    class Meta:
        ordering = ['-date_modified']

class BucketlistItem(models.Model):
    title = models.CharField(max_length=30)
    bucketlist = models.ForeignKey(Bucketlist, related_name="bl_items")
    done = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return '<Item {}>'.format(self.title)

    class Meta:
        ordering = ['done', '-date_modified']
