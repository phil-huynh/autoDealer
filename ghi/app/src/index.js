import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadManufacturers() {
  const response = await fetch('http://localhost:8100/api/manufacturers/');
  if (response.ok) {
    const data = await response.json();
    return data.manufacturers
  } else {
    console.error(response);
  }
}

async function loadModels() {
  const response = await fetch('http://localhost:8100/api/models/');
  if (response.ok) {
    const data = await response.json();
    return data.models
  } else {
    console.error(response);
  }
}

async function loadAutos() {
  const response = await fetch('http://localhost:8100/api/automobiles/');
  if (response.ok) {
    const data = await response.json();
    return data.autos
  } else {
    console.error(response);
  }
}

async function loadEmployees() {
  const response = await fetch('http://localhost:8070/api/employees/');
  if (response.ok) {
    const data = await response.json();
    return data.employees
  } else {
    console.error(response);
  }
}

async function loadServiceAppointments() {
  const response = await fetch('http://localhost:8080/api/appointments/');
  if (response.ok) {
    const data = await response.json();
    return data.appointments
  } else {
    console.error(response);
  }
}

async function loadPendingSales() {
  const response = await fetch('http://localhost:8090/api/pending_sales/');
  if (response.ok) {
    const data = await response.json();
    return data.pending_sales
  } else {
    console.error(response);
  }
}


async function updateRender() {
  const manufacturers = await loadManufacturers()
  const models = await loadModels()
  const autos =  await loadAutos()
  const employees = await loadEmployees()
  const serviceAppointments = await loadServiceAppointments()
  const pendingSales = await loadPendingSales()

  root.render(
    <React.StrictMode>
      <App
        allManufacturers={manufacturers}
        allModels={models}
        allAutos={autos}
        allEmployees={employees}
        allServiceAppointments={serviceAppointments}
        allPendingSales={pendingSales}
        loadManufacturers={loadManufacturers}
        loadModels={loadModels}
        loadAutos={loadAutos}
        loadEmployees={loadEmployees}
        loadServiceAppointments={loadServiceAppointments}
        loadPendingSales={loadPendingSales}
      />
    </React.StrictMode>
  );
}

updateRender()




