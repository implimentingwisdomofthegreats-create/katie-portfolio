from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import get_object_or_404, redirect, render

from .forms import RegisterForm, SubjectForm, TopicForm
from .models import Subject


def register(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = RegisterForm()
    return render(request, 'learning/register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'learning/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def dashboard(request):
    subjects = request.user.subjects.all()
    subject_form = SubjectForm()
    return render(request, 'learning/dashboard.html', {
        'subjects': subjects,
        'subject_form': subject_form,
    })


@login_required
def add_subject(request):
    if request.method == 'POST':
        form = SubjectForm(request.POST)
        if form.is_valid():
            subject = form.save(commit=False)
            subject.user = request.user
            subject.save()
    return redirect('dashboard')


@login_required
def subject_detail(request, pk):
    subject = get_object_or_404(Subject, pk=pk, user=request.user)
    topics = subject.topics.all()
    topic_form = TopicForm()
    return render(request, 'learning/detail.html', {
        'subject': subject,
        'topics': topics,
        'topic_form': topic_form,
    })


@login_required
def add_topic(request, pk):
    subject = get_object_or_404(Subject, pk=pk, user=request.user)
    if request.method == 'POST':
        form = TopicForm(request.POST)
        if form.is_valid():
            topic = form.save(commit=False)
            topic.subject = subject
            topic.save()
    return redirect('subject_detail', pk=pk)


@login_required
def delete_subject(request, pk):
    subject = get_object_or_404(Subject, pk=pk, user=request.user)
    if request.method == 'POST':
        subject.delete()
    return redirect('dashboard')


@login_required
def delete_topic(request, subject_pk, pk):
    subject = get_object_or_404(Subject, pk=subject_pk, user=request.user)
    topic = get_object_or_404(subject.topics, pk=pk)
    if request.method == 'POST':
        topic.delete()
    return redirect('subject_detail', pk=subject_pk)
