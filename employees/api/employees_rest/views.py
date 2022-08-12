from curses.ascii import EM
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Department, Employee, Job, Number
from common.json import ModelEncoder


class NumberListEncoder(ModelEncoder):
    model=Number
    properties = ["number"]


class DepartmentListEncoder(ModelEncoder):
    model = Department
    properties = [ "id", "name"]


class JobTitleListEncoder(ModelEncoder):
    model = Job
    properties = ["id", "title", "department"]
    encoders = {
        "department": DepartmentListEncoder(),
    }

class EmployeeListEncoder(ModelEncoder):
    model = Employee
    properties = [
        "first_name",
        "last_name",
        "employee_number",
        "job",
        "id"
    ]
    encoders = {
        "job": JobTitleListEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_employees(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        return JsonResponse(
            {"employees": employees},
            encoder=EmployeeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            job_id = content["job"]
            job = Job.objects.get(id=job_id)
            content["job"] = job
        except Job.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid job id"},
                status=400,
            )
        employee = Employee.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=EmployeeListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_employee(request, pk):
    if request.method == "GET":
        employee = Employee.objects.get(employee_number=pk)
        return JsonResponse(
            employee,
            encoder=EmployeeListEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        Number.objects.filter(number=pk).update(available=True)
        count, _ = Employee.objects.filter(employee_number=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Employee.objects.filter(employee_number=pk).update(**content)
        employee = Employee.objects.get(employee_number=pk)
        return JsonResponse(
            employee,
            encoder=EmployeeListEncoder,
            safe=False,
        )



@require_http_methods(["GET"])
def api_get_technicians(request):
        job = Job.objects.get(title="Technician")
        technicians = Employee.objects.filter(job=job)
        return JsonResponse(
            {"technicians": technicians},
            encoder=EmployeeListEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_get_sales_people(request):
    job = Job.objects.get(title="Sales Person")
    sales_people = Employee.objects.filter(job=job)
    return JsonResponse(
        {"sales_people": sales_people},
        encoder=EmployeeListEncoder,
        safe=False,
    )


# ===============================================================

@require_http_methods(["POST"])
def api_upload_numbers(request):
    for num in range(100, 1000):
        content = {"number": num}
        Number.objects.create(**content)
    return JsonResponse({"message": "success"})

