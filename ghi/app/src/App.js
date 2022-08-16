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
import ListEmployees from './ListEmployees';
import AddEmployee from './AddEmployee';
import ListAppointments from './ListAppointments';
import AddAppointment from './AddAppointment';
import ListPendingSales from './ListPendingSales';
import AddPendingSale from './AddPendingSale';

const App = ({allAutos, allEmployees, allJobs, allManufacturers, allModels, allServiceAppointments, allPendingSales, loadAutos, loadEmployees, loadJobs,loadManufacturers, loadModels, loadPendingSales, loadServiceAppointments}) => {

  const [autos, setAutos] = useState([])
  const [employees, setEmployees] = useState([])
  const [jobs, setJobs] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [pendingSales, setPendingSales] = useState([])
  const [serviceAppointments, setServiceAppointments] = useState([])

  useEffect(()=>{
    setManufacturers(allManufacturers)
    setModels(allModels)
    setAutos(allAutos)
    setEmployees(allEmployees)
    setJobs(allJobs)
    setServiceAppointments(allServiceAppointments)
    setPendingSales(allPendingSales)
  }, [allAutos, allEmployees, allJobs, allManufacturers, allModels, allServiceAppointments, allPendingSales])


  const updateAutos = async ()=>{
    let list = await loadAutos()
    setAutos(list)
  }

  const updateEmployees = async ()=>{
    let list = await loadEmployees()
    setEmployees(list)
  }
  const updateJobs = async ()=>{
    let list = await loadJobs()
    setJobs(list)
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
                  models={models}
                  manufacturers={manufacturers}
                  updateAutos={updateAutos}
                />
              }
            />
          </Route>
          <Route path="employees">
            <Route
              index
              element={
                <ListEmployees
                  employees={employees}
                />
              }
            />
            <Route
              path="new"
              element={
                <AddEmployee
                  joblist={jobs}
                  updateEmployees={updateEmployees}
                />
              }
            />
          </Route>
          <Route path="appointments">
            <Route
              index
              element={
                <ListAppointments
                  appointments={serviceAppointments}
                />
              }
            />
            <Route
              path="new"
              element={
                <AddAppointment
                  employees={employees}
                  updateAppointments={updateServiceAppointments}
                />
              }
            />
          </Route>
          <Route path="pending-sales">
            <Route
              index
              element={
                <ListPendingSales
                  pendingSales={pendingSales}
                />
              }
            />
            <Route
              path="new"
              element={
                <AddPendingSale
                  autos={autos}
                  employees={employees}
                  updatePendingSales={updatePendingSales}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
