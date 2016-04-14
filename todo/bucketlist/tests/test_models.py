import datetime

from django.test import TestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User


user = User.objects.create(username='md', password='md')
bucketlist = Bucketlist.objects.create(name="My entry Bucketlist",
                                       created_by=user)
item = BucketlistItem.objects.create(title="My entry Bucketlist Item",
                                     bucketlist=bucketlist)


class UserModelTest(TestCase):
    """Test User Model"""
    def test_string_representation(self):
        self.assertEqual(str(user), user.username)

    def test_user_fields(self):
        self.assertEqual(user.username, 'md')


# class BucketlistModelTest(TestCase):
#     """Test Bucketlist Model"""
    def test_string_representation(self):
        self.assertEqual(str(bucketlist),
                         '<Bucketlist {}>'.format(bucketlist.name))

    def test_bl_fields(self):
        self.assertEqual(bucketlist.name, "My entry Bucketlist")
        self.assertEqual(bucketlist.created_by, user)

    def test_items(self):
        self.assertEqual(len(bucketlist.items), 1)


# class BucketlistItemModelTest(TestCase):
#     """Test BucketlistItem Model"""
    def test_string_representation(self):
        self.assertEqual(str(item), '<Item {}>'.format(item.title))

    def test_bli_fields(self):
        self.assertEqual(bucketlist.bl_items.first().id, 1)
        self.assertEqual(item.id, 1)
        self.assertEqual(bucketlist.bl_items.first().title, "My entry Bucketlist Item")
        self.assertEqual(item.title, "My entry Bucketlist Item")
        self.assertEqual(bucketlist.bl_items.first().done, False)
        self.assertEqual(item.done, False)
