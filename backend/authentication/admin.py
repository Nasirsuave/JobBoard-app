from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import EmployeeProfile, EmployerProfile

# Register your models here.
User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'role', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    list_filter = ('role', 'is_active', 'is_staff')

# @admin.register(EmployeeProfile)
class EmployeeProfileAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'full_name', 'phone', 'location',
    'user_id')
    search_fields = ('user__username', 'full_name', 'phone', 'location')

    def user_id(self, obj):
        return obj.user.id
        
    
    


class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'company_name', 'company_website', 'user_id')
    search_fields = ('user__username', 'company_name')

    def user_id(self, obj):
        return obj.user.id

# admin.site.register(EmployerProfile, EmployerProfileAdmin)
admin.site.register(EmployeeProfile, EmployeeProfileAdmin)
admin.site.register(EmployerProfile, EmployerProfileAdmin)