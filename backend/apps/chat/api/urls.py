from django.urls import path, re_path

from .views import (
    ChatListView,
    ChatDetailView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView,
    GetPrevMessges

)

app_name = 'chat'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<pk>', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
    path("prev-messages/<str:id>/<int:time>/<int:page>/", GetPrevMessges.as_view(), name="prev_messages"),

]
