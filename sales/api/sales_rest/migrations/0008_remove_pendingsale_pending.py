# Generated by Django 4.0.3 on 2022-08-16 05:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0007_vehiclevo_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pendingsale',
            name='pending',
        ),
    ]
