from allauth.account.adapter import DefaultAccountAdapter
from django import forms

class CustomAccountAdapter(DefaultAccountAdapter):
    def clean_password(self, password, user=None):
        return password
    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit)
        user.first_name = form.data.get("first_name")
        user.last_name = form.data.get("last_name")
        user.email = form.data.get("email")
        user.set_password(form.data.get("password"))
        user.save()
        return user