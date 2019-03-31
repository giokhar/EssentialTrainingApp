from django.contrib import admin
from controlPanel.models import Student, Quiz, Course, QuestionTemplate, QuizLog

# Register your models here.
admin.site.register([Student, Quiz, Course, QuestionTemplate, QuizLog])