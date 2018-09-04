from django.shortcuts import render

from django.contrib.auth.models import User


def index(request):
    return render(request, 'index.html')

def account(request):
    return render(request, 'account.html')

def not_found(request):
    return render(request, '404.html')

def bucketlists(request):
    return render(request, 'bucketlist.html')

def bucketlist_items(request):
    return render(request, 'bucketlist_item.html')
