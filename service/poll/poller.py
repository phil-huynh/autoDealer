import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import TechnicianVO, VehicleModelVO, VehicleVO


def get_techinicians():
    response = requests.get("http://employees-api:8000/api/employees/technicians/")
    content = json.loads(response.content)
    for technician in content["technicians"]:
        TechnicianVO.objects.update_or_create(
                first_name= technician["first_name"],
                last_name= technician["last_name"],
                employee_number= technician["employee_number"],
                tech_id=technician["id"]
        )

def get_vehicle_models():
    response = requests.get("http://inventory-api:8000/api/models/")
    content = json.loads(response.content)
    for model in content["models"]:
        VehicleModelVO.objects.update_or_create(
            name = model["name"],
            href = model["href"],
            manufacturer = model["manufacturer"]["name"],
            picture_url = model["picture_url"],
            model_id = model["id"]
        )

def get_vehicles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for auto in content["autos"]:
        VehicleVO.objects.update_or_create(
            color = auto["color"],
            year = auto["year"],
            vin = auto["vin"],
            make = auto["model"]["manufacturer"]["name"],
            model = auto["model"]["name"]
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_techinicians()
            get_vehicle_models()
            get_vehicles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
