import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddManufacturer from './AddManufacturer';
import AddModel from './AddModel';
import AddVehicle from './AddVehicle';
import ListManufacturers from './ListManufacturers'
import ListModels from './ListModels'
import ListAutos from './ListAutos'
import MainPage from './MainPage';
import Nav from './Nav';
import {useState, useEffect} from 'react';

function App({
  allAutos,
  allEmployees,
  allManufacturers,
  allModels,
  allPendingSales,
  allServiceAppointments,
  loadServiceAppointments,
  loadAutos,
  loadEmployees,
  loadPendingSales,
  loadManufacturers,
  loadModels
})
{



  const [autos, setAutos] = useState([])
  const [employees, setEmployees] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [pendingSales, setPendingSales] = useState([])
  const [serviceAppointments, setServiceAppointments] = useState([])

  useEffect(()=>{
    setManufacturers(allManufacturers)
    setModels(allModels)
    setAutos(allAutos)
    setEmployees(allEmployees)
    setServiceAppointments(allServiceAppointments)
    setPendingSales(allPendingSales)
  }, [allAutos, allEmployees, allManufacturers, allModels, allPendingSales, allServiceAppointments])

  const updateAutos = async ()=>{
    let list = await loadAutos()
    setAutos(list)
  }

  const updateEmployees = async ()=>{
    let list = await loadEmployees()
    setManufacturers(list)
  }

  const updateManufacturers = async ()=>{
    let list = await loadManufacturers()
    setManufacturers(list)
  }

  const updateModels = async ()=>{
    let list = await loadModels()
    setModels(list)
  }

  const updatePendingSales = async ()=>{
    let list = await loadPendingSales()
    setPendingSales(list)
  }

  const updateServiceAppointments = async ()=>{
    let list = await loadServiceAppointments()
    setServiceAppointments(list)
  }





  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route
              index
              element={
                <ListManufacturers
                  manufacturers={manufacturers}
                />
              }
            />
            <Route
              path="new"
              element={
                <AddManufacturer
                  updateManufacturers={updateManufacturers}
                />
              }
            />
          </Route>
          <Route path="models">
            <Route
              index
              element={<ListModels
                models={models}
              />}
            />
            <Route
              path="new"
              element={
                <AddModel
                  updateModels={updateModels}
                />
              }
            />
          </Route>
          <Route path="automobiles">
            <Route
              index
              element={
                <ListAutos
                  autos={autos}
                />
            }
            />
            <Route
              path="new"
              element={
                <AddVehicle
                  updateAutos={updateAutos}
                />
              }
            />
          </Route>
          <Route path="employees">
            <Route
              index
              element={
                <ListAutos
                  employees={employees}
                />
            }
            />
            {/* <Route
              path="new"
              element={
                <AddVehicle

                />
              }
            /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
