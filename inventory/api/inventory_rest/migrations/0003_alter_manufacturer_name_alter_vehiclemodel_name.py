# Generated by Django 4.0.3 on 2022-08-15 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0002_automobile_odometer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manufacturer',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='vehiclemodel',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
