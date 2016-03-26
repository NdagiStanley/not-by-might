from django.test import Client, TestCase
from django.core.urlresolvers import reverse
from .models import Bucketlist, BucketlistItem

client = Client()
# Create your tests here.


class APITests(TestCase):
    """APITests"""
    def test_index(self):
        response = client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)


class BucketlistModelTest(TestCase):
    """Test Bucketlist Model"""
    def test_string_representation(self):
        bucketlist = Bucketlist(name="My entry Bucketlist", created_by="User")
        self.assertEqual(str(bucketlist),
                         '<Bucketlist {}>'.format(bucketlist.name))


class BucketlistItemModelTest(TestCase):
    """Test BucketlistItem Model"""
    def test_string_representation(self):
        bucketlist = Bucketlist(name="My entry Bucketlist", created_by="User")
        item = BucketlistItem(title="My entry Bucketlist Item", bucketlist=bucketlist)
        self.assertEqual(str(item), '<Item {}>'.format(item.title))
