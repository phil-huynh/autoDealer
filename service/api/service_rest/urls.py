from django.urls import path

from .views import (
    api_list_service_appointments,
    api_show_service_appointment

)

urlpatterns = [
    path(
        "appointments/",
        api_list_service_appointments,
        name="api_list_service_appointments"
    ),
    path(
        "appointments/<int:ticket_number>",
        api_show_service_appointment,
        name="api_show_service_appointment"
    )
]