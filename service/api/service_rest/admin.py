from django.contrib import admin

from .models import TechnicianVO, VehicleModelVO, VehicleVO, ServiceAppointment, NextTicketNumber


@admin.register(TechnicianVO)
class TechnicianVOAdmin(admin.ModelAdmin):
    pass


@admin.register(VehicleModelVO)
class VehicleModelVOAdmin(admin.ModelAdmin):
    pass


@admin.register(VehicleVO)
class VehicleVOAdmin(admin.ModelAdmin):
    pass


@admin.register(NextTicketNumber)
class NextTicketNumberAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceAppointment)
class ServiceAppointmentVOAdmin(admin.ModelAdmin):
    pass


