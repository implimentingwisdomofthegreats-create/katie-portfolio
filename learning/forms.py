from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Subject, Topic


class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subject
        fields = ['name', 'goals']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Subject name',
                'class': 'modal-input',
            }),
            'goals': forms.Textarea(attrs={
                'placeholder': 'Learning goals (optional)',
                'class': 'modal-textarea',
                'rows': 5,
            }),
        }


class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['name', 'notes']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Topic name',
                'class': 'modal-input',
            }),
            'notes': forms.Textarea(attrs={
                'placeholder': 'Notes (optional)',
                'class': 'modal-textarea',
                'rows': 5,
            }),
        }
