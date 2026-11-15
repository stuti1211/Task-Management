from django.shortcuts import render , get_object_or_404 ,redirect
from django.http import HttpResponse
from .models import Task
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


def home(request):
   return HttpResponse("Welcome to Task Manager")

def task_list(request):
    tasks = Task.objects.all()

    context = {
        'tasks':tasks
    }

    return render(request ,'tasks/task_list.html',context)

def task_detail(request ,id):
     task = get_object_or_404(Task, id=id)
     return HttpResponse(f"Task title :{task.title}")


def create_task(request):
    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')

        Task.objects.create(
            title=title,
            description=description
        )

        return HttpResponse("Task created successfully")

    return render(request, 'tasks/create_task.html')

def update_task(request ,id):
    task = get_object_or_404(Task, id=id)

    if request.method == "POST":
       title = request.POST.get('title')
       description = request.POST.get('description')

       task.title = title
       task.description = description
       task.save()
       return redirect('task_list')
       return HttpResponse("Task updated successfully")
 
    context={
        'task':task
    }

    return render(request ,'tasks/update_task.html',context)

def delete_task(request,id):
    if request.method == "POST":
        task = get_object_or_404(Task,id=id)

        task.delete()
        return redirect('task_list')
    return HttpResponse("Invalid request")


# we have started the DRF api implementation in this part


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_task_list(request):
    tasks = Task.objects.filter(user=request.user)
    serializer =  TaskSerializer(tasks,many= True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_create_task(request):
    
    data = request.data
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data, status=201)
    return Response(serializer.errors,status=400)

@api_view(['PUT'])
def api_update_task(request, id):
    task = get_object_or_404(Task, id=id)
    data= request.data
    serializer = TaskSerializer(task,data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status= 201)
    return Response(serializer.errors,status=400)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def api_delete_task(request,id):
    task = get_object_or_404(Task, id=id ,user=request.user)
    task.delete()
    return Response({"message":"task deleted succesfuly"},status=200)

@api_view(['PATCH'])
def api_partial_update_task(request, id):
    task = get_object_or_404(Task, id=id)
    data = request.data
    serializer = TaskSerializer(task, data=data ,partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status= 201)
    return Response(serializer.errors,status=400)

@api_view(['POST'])
def api_signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response( {"error": "All fields are required"}, status=400 )
    user = User.objects.create_user(
        username = username, 
        password= password,
        email=email,
    )
    return Response({"message": "User registered successfully"},status=201)

@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
       return Response({"error": "Invalid credentials"}, status=401)
    refresh = RefreshToken.for_user(user)
    access  = refresh.access_token
    return Response({
        "refresh": str(refresh), "access": str(access)}, status=200)


