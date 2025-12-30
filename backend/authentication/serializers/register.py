
# users/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import EmployeeProfile, EmployerProfile

User = get_user_model()


# ----------- Base User Serializer ----------
class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role'] #use "__all__" to get all fields
        read_only_fields = ['id', 'role']





# ----------- Employee Registration ---------
class EmployeeRegisterSerializer(serializers.Serializer):
    # username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    # employee profile fields
    full_name = serializers.CharField()
    phone = serializers.CharField(required=False, allow_blank=True)
    resume = serializers.FileField(required=False, allow_null=True)
    skills = serializers.CharField(required=False, allow_blank=True)
    experience = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        employee_data = {
            'full_name': validated_data.pop('full_name'),
            'phone': validated_data.pop('phone', None),
            'resume': validated_data.pop('resume', None),
            'skills': validated_data.pop('skills', None),
            'experience': validated_data.pop('experience', None),
            'location': validated_data.pop('location', None),
        }

        user = User.objects.create_user(
            username=validated_data['email'], # Using email as username
            email=validated_data['email'],
            password=validated_data['password'],
            role='employee'
        )

        EmployeeProfile.objects.create(user=user, **employee_data)
 
        # 🔥 RETURN A DICT — NOT THE USER OBJECT
        return {
            "id": user.id,
            # "username": user.username,
            "email": user.email,
            "role": user.role,
            **employee_data
        }





# ----------- Employer Registration ---------
class EmployerRegisterSerializer(serializers.Serializer):
    #validation will be done against the fields below
    # username = serializers.CharField()
    # email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    company_name = serializers.CharField()
    contact_person_name = serializers.CharField(required=False)
    company_email = serializers.EmailField()
    company_website = serializers.URLField(required=False)
    phone = serializers.CharField(required=False)
    company_logo = serializers.FileField(required=False)
    company_description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)


    def create(self, validated_data):
        employer_data = {
            'company_name': validated_data.pop('company_name'),
            'contact_person_name': validated_data.pop('contact_person_name', None),
            'company_website': validated_data.pop('company_website', None),
            'phone': validated_data.pop('phone', None),
            'company_logo': validated_data.pop('company_logo', None),
            'company_description': validated_data.pop('company_description', None),
            'company_email': validated_data.pop('company_email',None),
            'location': validated_data.pop('location', None),
        }

        user = User.objects.create_user(
            role='employer',
            username=employer_data["company_email"],
            # email=validated_data['email'],
            password=validated_data['password'],
        )

        EmployerProfile.objects.create(
            user=user,
            **employer_data
        )

        return {
        'username': user.username,
        'email': user.email,
        'role': user.role,
        **employer_data
    }




class AdminRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='admin'
        )
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }