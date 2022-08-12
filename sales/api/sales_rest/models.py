from django.db import models

class SalesPersonVO(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField()
    sales_person_id = models.SmallIntegerField(null=True)

    def __str__(self):
        return f"{str(self.employee_number)} -- {self.last_name}, {self.first_name}"

class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    href = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    picture_url = models.URLField()
    model_id = models.SmallIntegerField(null=True)

    def __str__(self):
        return f"{self.manufacturer} {self.name}"

class VehicleVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.vin} -- {self.make} {self.model}"

class NextSalesReceiptNumber(models.Model):
    number = models.SmallIntegerField()

    def __str__(self):
        return f"{str(self.number)}"

def get_interaction_number():
    interaction = NextSalesReceiptNumber.objects.get(id=1)
    return interaction.number

def get_receipt_number():
    receipt = NextSalesReceiptNumber.objects.get(id=2)
    return receipt.number

def increment_number(selection):
    number = NextSalesReceiptNumber.objects.get(id=selection).number
    number+=1
    NextSalesReceiptNumber.objects.filter(id=selection).update(number=number)

# def vin_choices():
#     vehicles = VehicleVO.objects.all()
#     return [(vehicle.vin, vehicle.vin) for vehicle in vehicles]



class PendingSale(models.Model):
    interaction_number = models.SmallIntegerField(default=0 , null=True)
    vin = models.CharField(max_length=17, unique=True, default="Waiting for VIN")
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_and_time = models.DateTimeField(auto_now=True ,null=True)
    price = models.SmallIntegerField()
    made_downpayment = models.BooleanField(default=False)
    loan_approved = models.BooleanField(default=False)
    paid_full_cost = models.BooleanField(default=False)
    vehicle_registered = models.BooleanField(default=False)
    vehicle = models.ForeignKey(
        VehicleVO,
        related_name="interested_customer",
        on_delete=models.CASCADE,
        null=True
    )
    sales_person = models.ForeignKey(
        SalesPersonVO,
        related_name="sales_receipts",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"{self.interaction_number} -- {self.vin} -- {self.last_name}, {self.first_name}"

    def save(self, *args, **kwargs):
        vin = self.vehicle.vin
        self.vin = vin
        if self.interaction_number == 0:
            self.interaction_number = get_interaction_number()
            increment_number(1)
        super().save(*args, **kwargs)