from django.db import models


class TechnicianVO(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField()
    tech_id = models.SmallIntegerField(null=True)

    def __str__(self):
        return f"{str(self.employee_number)} -- {self.last_name}, {self.first_name}"


class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    href = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    model_id = models.SmallIntegerField(null=True)

    def __str__(self):
        return f"{self.manufacturer} {self.name}"


class VehicleVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    odometer = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.vin} -- {self.make} {self.model}"


class NextTicketNumber(models.Model):
    number=models.SmallIntegerField()

    def __str__(self):
        return f"{str(self.number)}"


def get_ticket_number():
    ticket = NextTicketNumber.objects.get(id=1)
    return ticket.number


def increment_number():
    number = get_ticket_number()
    number+=1
    NextTicketNumber.objects.filter(id=1).update(number=number)


class ServiceAppointment(models.Model):
    ticket_number = models.SmallIntegerField(default=0, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    vin = models.CharField(max_length=17)
    date_and_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    technician = models.ForeignKey(
        TechnicianVO,
        related_name="appointments",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"{self.ticket_number} -- {self.vin} -- {self.last_name}, {self.first_name}"

    def save(self, *args, **kwargs):
        if self.ticket_number == 0:
            self.ticket_number = get_ticket_number()
            increment_number()
        super().save(*args, **kwargs)
