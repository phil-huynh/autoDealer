# Generated by Django 4.0.3 on 2022-08-15 08:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NextTicketNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TechnicianVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('employee_number', models.SmallIntegerField()),
                ('tech_id', models.SmallIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleModelVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('href', models.CharField(max_length=100)),
                ('manufacturer', models.CharField(max_length=100)),
                ('picture_url', models.URLField()),
                ('model_id', models.SmallIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=50)),
                ('year', models.PositiveSmallIntegerField()),
                ('vin', models.CharField(max_length=17, unique=True)),
                ('make', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ServiceAppointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticket_number', models.SmallIntegerField(default=0, null=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('vin', models.CharField(max_length=17)),
                ('date_and_time', models.DateTimeField(null=True)),
                ('reason', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointments', to='service_rest.technicianvo')),
            ],
        ),
    ]
