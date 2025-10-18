from django.shortcuts import render

from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def other(request):
    return render(request, 'index.html', {'segment': 'dashboard'})
