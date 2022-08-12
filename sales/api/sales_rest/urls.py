from django.urls import path

from .views import (
    api_list_pending_sales,
    api_show_sales_interaction
)

urlpatterns = [
    path(
        "pending_sales/",
        api_list_pending_sales,
        name="api_list_pending_sales"
    ),
    path(
        "pending_sales/<int:interaction_number>",
        api_show_sales_interaction,
        name="api_show_sales_interaction"
    ),

]