from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from ..models import Bucketlist, BucketlistItem, User


class UserTests(APITestCase):

    # Include the fixtures
    fixtures = ['bucketlists.json']

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_register(self):
        """Test /api/v1/auth/register/ route"""

        # Already registered user
        # This validation could also be in the frontend
        user = {'username': 'admin', 'email': 'ndagi@gmail.com',
                'password': '1234', 'confirm_password': '1234'}
        response = self.client.post(reverse('register'), user, format='json')
        self.assertEqual(response.status_code, 400)

        # Correct request
        user = {'username': 'stanmd', 'email': 'ndagi@gmail.com',
                'password': '1234', 'confirm_password': '1234'}
        response = self.client.post(reverse('register'), user, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.filter(
            username='stanmd').first().email, 'ndagi@gmail.com')

    def test_login(self):
        """Test /api/v1/auth/login/ route"""

        # Random user not in DB
        # This validation could also be in the frontend
        user = {'username': 'random', 'password': '1234'}
        response = self.client.post(reverse('login'), user, format='json')
        self.assertEqual(response.status_code, 400)

        # Correct request
        user = {'username': 'admin', 'password': 'me'}
        response = self.client.post(reverse('login'), user, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('token' in response.data)
