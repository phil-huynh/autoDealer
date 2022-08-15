from django.urls import path

from .views import (
    api_list_employees,
    api_show_employee,
    api_get_sales_people,
    api_get_technicians,
    api_get_jobs,
    # api_upload_numbers,

)

urlpatterns = [
    path(
        "employees/",
        api_list_employees,
        name="api_list_employees",
    ),
    path(
        "employees/<int:pk>/",
        api_show_employee,
        name="api_list_employees",
    ),
    path(
        "employees/technicians/",
        api_get_technicians,
        name="api_get_technicians",
    ),
    path(
        "employees/sales_people/",
        api_get_sales_people,
        name="api_get_sales_people",
    ),
    path(
        "employees/jobs/",
        api_get_jobs,
        name="api_get_jobs",
    ),
    # path(
    #     "numbers/",
    #     api_upload_numbers,
    #     name="api_upload_numbers",
    # ),

]