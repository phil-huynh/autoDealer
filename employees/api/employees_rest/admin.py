from django.contrib import admin

from .models import Department, Employee, Job, Number


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(Number)
class NumberAdmin(admin.ModelAdmin):
    pass
