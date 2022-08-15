import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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

async function loadJobs() {
  const response = await fetch('http://localhost:8070/api/employees/jobs/');
  if (response.ok) {
    const data = await response.json();
    return data.jobs
  } else {
    console.error(response);
  }
}

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

async function loadPendingSales() {
  const response = await fetch('http://localhost:8090/api/pending_sales/');
  if (response.ok) {
    const data = await response.json();
    return data.pending_sales
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


async function updateRender() {
  const autos =  await loadAutos()
  const employees = await loadEmployees()
  const jobs = await loadJobs()
  const manufacturers = await loadManufacturers()
  const models = await loadModels()
  const pendingSales = await loadPendingSales()
  const serviceAppointments = await loadServiceAppointments()

  root.render(
    <React.StrictMode>
      <App
        allAutos={autos}
        allEmployees={employees}
        allJobs={jobs}
        allManufacturers={manufacturers}
        allModels={models}
        allPendingSales={pendingSales}
        allServiceAppointments={serviceAppointments}
        loadAutos={loadAutos}
        loadEmployees={loadEmployees}
        loadJobs={loadJobs}
        loadManufacturers={loadManufacturers}
        loadModels={loadModels}
        loadPendingSales={loadPendingSales}
        loadServiceAppointments={loadServiceAppointments}
      />
    </React.StrictMode>
  );
}

updateRender()




