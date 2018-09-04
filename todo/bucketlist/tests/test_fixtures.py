from rest_framework.test import APITestCase
from ..models import Bucketlist, BucketlistItem, User


class FixtureTests(APITestCase):

    # Include the fixtures
    fixtures = ['bucketlists.json']

    def test_fixtures(self):
        """Test objects in fixtures"""
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(Bucketlist.objects.count(), 2)
        self.assertEqual(BucketlistItem.objects.count(), 2)
