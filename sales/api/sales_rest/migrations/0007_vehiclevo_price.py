# Generated by Django 4.0.3 on 2022-08-16 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_remove_vehiclevo_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehiclevo',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]
