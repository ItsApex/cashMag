from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from     django.shortcuts import render
from django.urls import reverse
import json
from .models import User, Expenses
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.views.decorators.csrf import csrf_exempt

def index(request):

    # if (request.user.is_authenticated):
    #     user = User.objects.get(username = request.user)
    #     things = Expenses.objects.filter(user = user)
    #     print(things)
    #     for thing in things:
    #         print("hi")
    #         print(thing.user , thing.nameexp , thing.amountexp , thing.typeexp)

    #     if request.method == "PUT":
    #         return JsonResponse({"Expense": things})

    return render(request,"cashish/index.html")

@csrf_exempt
@login_required
def collect_info(request):
    user = User.objects.get(username = request.user)
    things = Expenses.objects.filter(user = user)
    # print(things)
    for thing in things:
        print("hi")
        # print(thing.user , thing.nameexp , thing.amountexp , thing.typeexp)
    
    if request.method == "POST":
        return JsonResponse([thing.serialize() for thing in things ],safe=False)
    return HttpResponse()

def addexp(request,username):
    print(username)
    name = User.objects.get(username = username)
    if request.method == "POST":
        expenses = request.POST["name-exp"]
        amount = request.POST["amount-exp"]
        typeexpenses = request.POST["type-exp"]
        print(expenses.capitalize(),amount,typeexpenses.lower().rstrip() )

        try:
            addexpenses = Expenses(user = name , nameexp = expenses.capitalize() ,amountexp = amount , typeexp = typeexpenses.lower().rstrip() ) 
            # addexpenses.nameexp = expenses
            # addexpenses.amountexp = amount
            # addexpenses.typeexp = typeexpenses
            addexpenses.save()
        except IntegrityError:
            print("could not add expenses")
    return render(request, "cashish/addexp.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "cashish/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "cashish/login.html")


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "cashish/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username.capitalize(), email, password)
            user.save()
        except IntegrityError:
            return render(request, "cashish/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "cashish/register.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))