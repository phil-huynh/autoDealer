from django.db import models
from django.urls import reverse


class Manufacturer(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})

    def __str__(self):
        return self.name

class VehicleModel(models.Model):
    name = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)
    manufacturer = models.ForeignKey(
        Manufacturer,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.manufacturer.name} -- {self.name}"


class Automobile(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    odometer = models.IntegerField(null=True)
    price = models.IntegerField(null=True)
    pending = models.BooleanField(default=False, null=True)
    model = models.ForeignKey(
        VehicleModel,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})

    def __str__(self):
        return f"{self.vin} -- {self.color} {self.year} {self.model.manufacturer.name} {self.model.name}"
