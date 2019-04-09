from django.conf.urls import url
from backend import views


urlpatterns = [
	url(r'^api/students/$', views.StudentList.as_view(), name='student_list_api'),
	url(r'^api/students/(?P<hash>[0-9]+)/$', views.StudentDetail.as_view(), name='student_details_api'),
	url(r'^api/quizzes/(?P<quiz_id>[0-9]+)/$', views.QuizDetail.as_view(), name='quiz_details_api'),
]