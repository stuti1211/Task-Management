from django.db import models
from django.conf import settings

class Task(models.Model):
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    # Keep your existing fields here
    STATUS_CHOICES =[('pending', 'Pending'),
    ('in_progress', 'In Progress'),
    ('completed', 'Completed'),
    ]

    PRIORITY_CHOICES = [('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    status =models.CharField(max_length=20,choices=STATUS_CHOICES ,default ='pending')
    priority= models.CharField(max_length=20,choices=PRIORITY_CHOICES , default='medium')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)