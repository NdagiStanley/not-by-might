from django.test import Client, TestCase
from django.core.urlresolvers import reverse

client = Client()
# Create your tests here.


class APITests(TestCase):
    """APITests"""

    def test_index(self):
        response = client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
