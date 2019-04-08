from rest_framework import routers
from .api import StudentViewSet, QuizViewSet, CourseViewSet, QuestionTemplateViewSet, QuizLogViewSet

router = routers.DefaultRouter()
router.register('api/students', StudentViewSet, 'students')
router.register('api/quizzes',  QuizViewSet, 'quizzes')
router.register('api/courses',  CourseViewSet, 'courses')
router.register('api/question_templates', QuestionTemplateViewSet, 'question_templates')
router.register('api/quiz_logs', QuizLogViewSet, 'quiz_logs')


urlpatterns = router.urls