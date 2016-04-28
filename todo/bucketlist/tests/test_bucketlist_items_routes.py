from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User

message = {"detail":
           "Authentication credentials were not provided."}
url = '/api/v1/bucketlists/2/items/'
url_one = '/api/v1/bucketlists/2/items/2'


class BucketlistItemsTests(APITestCase):

    # Includes two bucketlists and bucketlists-items
    fixtures = ['bucketlists.json']

    def setUp(self):
        # Login user md
        user = {'username': 'md', 'password': 'me'}
        response = self.client.post(reverse('login'), user, format='json')
        self.token = 'Token ' + response.data.get('token')

    def test_post_bucketlists_items_list(self):
        """Test that we can create items via /api/v1/bucketlists/<id>/items route"""

        new_bucketlist_item = {"title": "Title 3"}

        # Asserting no access without token
        response = self.client.post(url, new_bucketlist_item)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.post(url, new_bucketlist_item)
        self.assertEqual(auth_response.status_code, 201)
        self.assertEqual(BucketlistItem.objects.count(), 3)

    def test_put_bucketlists_detail(self):
        """Test that we can update items via /api/v1/bucketlists/<id>/items/<pk> route"""

        update_bucketlist_item = {"title": "Item Three"}

        # Asserting no access without token
        response = self.client.put(url_one, update_bucketlist_item)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.put(url_one, update_bucketlist_item)
        self.assertEqual(auth_response.status_code, 200)
        self.assertEqual(Bucketlist.objects.count(), 2)
        self.assertEqual(auth_response.data.get('message'), "Item '2' updated successfully")

    def test_delete_bucketlists_detail(self):
        """Test that we can delete items via /api/v1/bucketlists/<id>/items/<pk> route"""

        # Asserting no access without token
        response = self.client.delete(url_one)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.delete(url_one)
        self.assertEqual(auth_response.status_code, 204)
        self.assertEqual(BucketlistItem.objects.count(), 1)
