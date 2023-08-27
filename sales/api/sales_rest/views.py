from curses.ascii import EM
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import VehicleModelVO, VehicleVO, SalesPersonVO, NextSalesReceiptNumber, PendingSale
from common.json import ModelEncoder


class SalesPersonVOEncoder(ModelEncoder):
    model=SalesPersonVO
    properties = [
        "first_name",
        "last_name",
        "employee_number",
        "sales_person_id"
    ]


class VehicleModelVOEncoder(ModelEncoder):
    model=VehicleModelVO
    properties = [
        "name",
        "model_id",
        "href",
        "manufacturer",
    ]


class VehicleVOEncoder(ModelEncoder):
    model=VehicleVO
    properties = [
        "vin",
        "make",
        "model",
        "year",
        "color",
        "odometer",
        "price",
    ]


class PendingSaleEncoder(ModelEncoder):
    model=PendingSale
    properties = [
        "interaction_number",
        # "vin",
        "first_name",
        "last_name",
        "date_and_time",
        # "price",
        "made_downpayment",
        "loan_approved",
        "paid_full_cost",
        "vehicle_registered",
        "vehicle",
        "sales_person"
    ]
    encoders={
        "vehicle": VehicleVOEncoder(),
        "sales_person": SalesPersonVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_pending_sales(request):
    if request.method == "GET":
        pending_sales = PendingSale.objects.all()
        return JsonResponse(
            pending_sales,
            encoder=PendingSaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        print("sale content =====>", content)
        try:
            employee_number= int(content["sales_person"])
            print(employee_number, type(employee_number))
            sales_person = SalesPersonVO.objects.get(employee_number=employee_number)
            content["sales_person"] = sales_person
        except SalesPersonVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=400,
            )
        try:
            vin= content["vehicle"]
            vehicle = VehicleVO.objects.get(vin=vin)
            content["vehicle"] = vehicle
        except VehicleVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )
        pending_sale = PendingSale.objects.create(**content)
        return JsonResponse(
            pending_sale,
            encoder=PendingSaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sales_interaction(request, interaction_number):
    if request.method == "GET":
        interaction = PendingSale.objects.get(interaction_number=interaction_number)
        return JsonResponse(
            interaction,
            encoder=PendingSaleEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = PendingSale.objects.filter(interaction_number=interaction_number).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        PendingSale.objects.filter(interaction_number=interaction_number).update(**content)
        interaction = PendingSale.objects.get(interaction_number=interaction_number)
        return JsonResponse(
            interaction,
            encoder=PendingSaleEncoder,
            safe=False,
        )