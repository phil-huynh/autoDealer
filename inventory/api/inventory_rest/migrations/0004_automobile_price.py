# Generated by Django 4.0.3 on 2022-08-16 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0003_alter_manufacturer_name_alter_vehiclemodel_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobile',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]