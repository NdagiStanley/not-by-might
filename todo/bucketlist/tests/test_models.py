import datetime

from django.test import TestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User

class UserModelTest(TestCase):
    """Test User Model"""

    def setUp(self):
        """Create instances of the models"""
        self.user = User.objects.create(username='md', password='md')
        self.bucketlist = Bucketlist.objects.create(
            name="My entry Bucketlist", created_by=self.user)
        self.item = BucketlistItem.objects.create(
            title="My entry Bucketlist Item", bucketlist=self.bucketlist)

    def tearDown(self):
        """Clean the test db"""
        User.objects.all().delete()
        Bucketlist.objects.all().delete()
        BucketlistItem.objects.all().delete()

    def test_user_string_representation(self):
        """Test the representation of user instance"""
        self.assertEqual(str(self.user), self.user.username)

    def test_user_fields(self):
        """Test the fields of user model"""
        self.assertEqual(self.user.username, 'md')

    def test_bl_fields(self):
        """Test the fields of bucketlist model"""
        self.assertEqual(self.bucketlist.name, "My entry Bucketlist")
        self.assertEqual(self.bucketlist.created_by, self.user)

    def test_list_string_representation(self):
        """Test the representation of BucketlistItem instance"""
        self.assertEqual(str(self.bucketlist), '<Bucketlist {}>'.format(self.bucketlist.name))

    def test_items(self):
        """Test the list of items of bucketlist instance"""
        self.assertEqual(len(self.bucketlist.items), 1)

    def test_item_string_representation(self):
        """Test the representation of BucketlistItem instance"""
        self.assertEqual(str(self.item), '<Item {}>'.format(self.item.title))

    def test_bli_fields(self):
        """Test the fields of item model"""
        self.assertEqual(self.bucketlist.bl_items.first().id, 1)
        self.assertEqual(self.item.id, 1)
        self.assertEqual(self.bucketlist.bl_items.first().title, "My entry Bucketlist Item")
        self.assertEqual(self.item.title, "My entry Bucketlist Item")
        self.assertEqual(self.bucketlist.bl_items.first().done, False)
        self.assertEqual(self.item.done, False)
