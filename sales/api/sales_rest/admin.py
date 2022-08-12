from django.contrib import admin

from .models import PendingSale, SalesPersonVO, VehicleModelVO, VehicleVO, NextSalesReceiptNumber


@admin.register(SalesPersonVO)
class SalesPersonVOAdmin(admin.ModelAdmin):
    pass


@admin.register(VehicleModelVO)
class SalesPersonVOAdmin(admin.ModelAdmin):
    pass


@admin.register(VehicleVO)
class SalesPersonVOAdmin(admin.ModelAdmin):
    pass


@admin.register(NextSalesReceiptNumber)
class NextSalesReceiptNumberAdmin(admin.ModelAdmin):
    pass


@admin.register(PendingSale)
class PendingSaleAdmin(admin.ModelAdmin):
    pass