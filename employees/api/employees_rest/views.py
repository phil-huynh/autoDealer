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


class JobListEncoder(ModelEncoder):
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
        "job": JobListEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_employees(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        return JsonResponse(
            employees,
            encoder=EmployeeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        content["first_name"] = content["first_name"].title()
        content["last_name"] = content["last_name"].title()
        try:
            job_id = content["job"]
            # job = Job.objects.get(id=job_id)
            content["job"] = Job.objects.get(id=job_id)
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
        if content["first_name"]:
            content["first_name"] = content["first_name"].title()
        if content["last_name"]:
            content["last_name"] = content["last_name"].title()
        Employee.objects.filter(employee_number=pk).update(**content)
        employee = Employee.objects.get(employee_number=pk)
        return JsonResponse(
            employee,
            encoder=EmployeeListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_get_jobs(request):
    if request.method == "GET":
        jobs = Job.objects.all()
        return JsonResponse(
            jobs,
            encoder=JobListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        # title = content["title"].title()
        content["title"] = content["title"].title()
        try:
            dept_id = content["department"]
            # department = Department.objects.get(id=dept_id)
            content["department"] = Department.objects.get(id=dept_id)
        except Job.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Department id"},
                status=400,
            )
        job = Job.objects.create(**content)
        return JsonResponse(
            job,
            encoder=JobListEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_get_technicians(request):
        job = Job.objects.get(title="Technician")
        technicians = Employee.objects.filter(job=job)
        return JsonResponse(
            technicians,
            encoder=EmployeeListEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_get_sales_people(request):
    job = Job.objects.get(title="Sales Person")
    sales_people = Employee.objects.filter(job=job)
    return JsonResponse(
        sales_people,
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

