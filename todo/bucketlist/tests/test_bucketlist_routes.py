from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User


# Create your tests here.
class BucketlistTests(APITestCase):

    # Includes two bucketlists and bucketlists-items
    fixtures = ['bucketlists.json']

    def SetUp(self):
        user = {'username': 'md', 'password': 'me'}
        response = self.client.post(reverse('login'), user, format='json')

    # def get_bucketlists_list():
