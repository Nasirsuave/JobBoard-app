
from django.urls import path
from .views.register import RegisterEmployeeView, RegisterEmployerView, RegisterAdminView
from .views.login import EmployeeLoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('register/employee/', RegisterEmployeeView.as_view()),
    path('register/employer/', RegisterEmployerView.as_view()),
    path('register/admin/', RegisterAdminView.as_view()),
    path("login/employee/", EmployeeLoginView.as_view(), name="employee-login"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh token

]


