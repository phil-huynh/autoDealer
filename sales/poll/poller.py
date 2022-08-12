from email import contentmanager
from urllib import response
import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import SalesPersonVO, VehicleModelVO, VehicleVO

def get_sales_people():
    response = requests.get("http://employees-api:8000/api/employees/sales_people")
    content = json.loads(response.content)
    for person in content["sales_people"]:
        SalesPersonVO.objects.update_or_create(
            first_name = person["first_name"],
            last_name = person["last_name"],
            employee_number = person["employee_number"],
            sales_person_id = person["id"]
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
        print('Sales poller polling for data')
        try:
            get_sales_people()
            get_vehicle_models()
            get_vehicles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
