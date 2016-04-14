from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User

message = {"detail":
           "Authentication credentials were not provided."}
url = 'api/v1/bucketlists/3'


class BucketlistTests(APITestCase):

    # Includes two bucketlists and bucketlists-items
    fixtures = ['bucketlists.json']

    def setUp(self):
        # Login user md
        user = {'username': 'md', 'password': 'me'}
        response = self.client.post(reverse('login'), user, format='json')
        self.token = 'JWT ' + response.data.get('token')

    def get_bucketlists_list(self):
        """Test that we can retrieve bucketlists via /api/v1/bucketlists/ route"""

        # Asserting no access without token
        response = self.client.get(reverse('bucketlist-list'))
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.get(reverse('bucketlist-list'))
        self.assertEqual(auth_response.data['count'], 2)
        import ipdb; ipdb.set_trace()
        self.assertEqual(auth_response.data['results'][0]['id'], True)
        self.assertEqual(auth_response.status_code, 200)
        self.assertNotEqual(auth_response.data, {})


    def post_bucketlists_list(self):
        """Test that we can create bucketlists via /api/v1/bucketlists/ route"""

        new_bucketlist = {"name": "Bucketlist 3"}

        # Asserting no access without token
        response = self.client.post(reverse('bucketlist-list'), new_bucketlist)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.post(reverse('bucketlist-list'), new_bucketlist)
        self.assertEqual(auth_response.status_code, 201)
        self.assertEqual(Bucketlist.objects.count(), 3)

    def get_bucketlists_detail(self):
        """Test that we can retrieve bucketlists via /api/v1/bucketlists/<id> route"""

        # Asserting no access without token
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.get(url)
        self.assertEqual(auth_response.status_code, 200)
        self.assertEqual(auth_response.data.get('id'), 3)

    def put_bucketlists_detail(self):
        """Test that we can update bucketlists via /api/v1/bucketlists/<id> route"""

        update_bucketlist = {"name": "Bucketlist Three"}

        # Asserting no access without token
        response = self.client.put(url, update_bucketlist)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.put(url, update_bucketlist)
        self.assertEqual(auth_response.status_code, 200)
        self.assertEqual(Bucketlist.objects.count(), 3)
        self.assertEqual(auth_response.data.get('name'), "Bucketlist Three")

    def delete_bucketlists_detail(self):
        """Test that we can delete bucketlists via /api/v1/bucketlists/<id> route"""

        # Asserting no access without token
        response = self.client.put(url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data, message)

        # set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting access upon auth by token
        auth_response = self.client.delete(url)
        self.assertEqual(auth_response.status_code, 204)
        self.assertEqual(Bucketlist.objects.count(), 2)
