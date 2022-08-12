from zoneinfo import available_timezones
from django.db import models
from random import randint



class Number(models.Model):
    number = models.SmallIntegerField()
    available = models.BooleanField(default=True)

    def __str__(self):
        return str(self.number)


def add_employee_number():
    num = randint(100, 999)
    active = True

    while active:
        option = Number.objects.get(number=num)
        if not option.available:
            num = randint(100, 999)
        else:
            active = False
    return num


class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=100)
    department = models.ForeignKey(
        Department,
        related_name="departments",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.title


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField(default=add_employee_number)
    job = models.ForeignKey(
        Job,
        related_name="jobs",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

    def save(self, *args, **kwargs):
        num = self.employee_number
        Number.objects.filter(number=num).update(available=False)
        super().save(*args, **kwargs)





