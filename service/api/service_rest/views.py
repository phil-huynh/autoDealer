from curses.ascii import EM
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import TechnicianVO, VehicleModelVO, VehicleVO, ServiceAppointment
from common.json import ModelEncoder


class TechnicianVOEncoder(ModelEncoder):
    model=TechnicianVO
    properties = [
    "first_name",
    "last_name",
    "employee_number",
    "tech_id"
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
    "odometer"
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model=ServiceAppointment
    properties = [
    "ticket_number",
    "vin",
    "first_name",
    "last_name",
    "date_and_time",
    "reason",
    "description",
    "technician"
    ]
    encoders={
      "technician": TechnicianVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_service_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        formatted_first_name = content["first_name"].title()
        formatted_last_name = content["last_name"].title()
        content["first_name"] = formatted_first_name
        content["last_name"] = formatted_last_name
        try:
            employee_number= content["technician"]
            technician = TechnicianVO.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except TechnicianVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid job id"},
                status=400,
            )
        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_service_appointment(request, ticket_number):
    if request.method == "GET":
        ticket = ServiceAppointment.objects.get(ticket_number=ticket_number)
        return JsonResponse(
            ticket,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(ticket_number=ticket_number).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        if content["first_name"]:
            formatted_first_name = content["first_name"].title()
            content["first_name"] = formatted_first_name
        if content["last_name"]:
            formatted_last_name = content["last_name"].title()
            content["last_name"] = formatted_last_name
        ServiceAppointment.objects.filter(ticket_number=ticket_number).update(**content)
        ticket = ServiceAppointment.objects.get(ticket_number=ticket_number)
        return JsonResponse(
            ticket,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )