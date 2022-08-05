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

async function updateData(callback, manufacturers, models, autos) {
  if (callback === loadManufacturers) {
    manufacturers = await loadManufacturers()
  }
  if (callback === loadModels) {
    models = await loadModels()
  }
  if (callback === loadAutos) {
    autos = await loadAutos()
  }
  root.render(
    <React.StrictMode>
      <App
        manufacturers={manufacturers}
        models={models}
        autos={autos}
        loadManufacturers={loadManufacturers}
        loadModels={loadModels}
        loadAutos={loadAutos}
        updateData={updateData}
      />
    </React.StrictMode>
  );
}

async function updateRender() {
  const manufacturers = await loadManufacturers()
  const models = await loadModels()
  const autos =  await loadAutos()

  root.render(
    <React.StrictMode>
      <App
        manufacturers={manufacturers}
        models={models}
        autos={autos}
        loadManufacturers={loadManufacturers}
        loadModels={loadModels}
        loadAutos={loadAutos}
        updateData={updateData}
      />
    </React.StrictMode>
  );
}

updateRender()




