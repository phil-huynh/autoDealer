import { useState, useContext, createContext } from 'react'

const ContextStore = createContext(null);

export default function ContextProvider ({ children }) {

  const urls = {
    autos: 'http://localhost:8100/api/automobiles/',
    employees: 'http://localhost:8070/api/employees/',
    jobs: 'http://localhost:8070/api/employees/jobs/',
    manufacturers: 'http://localhost:8100/api/manufacturers/',
    models: 'http://localhost:8100/api/models/',
    sales: 'http://localhost:8090/api/pending-sales/',
    appointments: 'http://localhost:8080/api/appointments/',
    employee: (id) => `http://localhost:8070/api/employees/${id}`,
    manufacturer: (id) =>`http://localhost:8100/api/manufacturers/${id}`,
    model: (id) => `http://localhost:8100/api/models/${id}`,
    vehicle: (vin) => `http://localhost:8100/api/automobiles/${vin}`,
    sale: (number) => `http://localhost:8090/api/pending-sales/${number}`,
    appointment: (number) => `http://localhost:8080/api/appointments/${number}`
  }

  const request = {
    get: async (url, callBack) => {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        callBack(data)
      } else console.log(response)
    },

    post: async (url, data, callBack) => {
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        callBack()
      }
    },

    put: async (url, data, callBack) => {
      const fetchConfig = {
        method: "put",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        callBack()
      }
    },

    delete: async (url, callBack) => {
      const response = await fetch(url, { method: "delete" })
      if (response.ok && callBack) {
        callBack()
      }
    }
  }

  const [autos, setAutos] = useState([])
  const [employees, setEmployees] = useState([])
  const [jobs, setJobs] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [pendingSales, setPendingSales] = useState([])
  const [serviceAppointments, setServiceAppointments] = useState([])

  const [addVehicleModal, setAddVehicleModal] = useState(false)
  const [editVehicleModal, setEditVehicleModal] = useState(false)
  const [addManufacturerModal, setAddManufacturerModal] = useState(false)
  const [editManufacturerModal, setEditManufacturerModal] = useState(false)
  const [addModelModal, setAddModelModal] = useState(false)
  const [editModelModal, setEditModelModal] = useState(false)
  const [addSaleModal, setAddSaleModal] = useState(false)
  const [editSaleModal, setEditSaleModal] = useState(false)
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const [editEmployeeModal, setEditEmployeeModal] = useState(false)
  const [addAppointmentModal, setAddAppointmentModal] = useState(false)
  const [editAppointmentModal, setEditAppointmentModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selection, setSelection] = useState(null)

  const [selectedVehicle, setSelectedVehicle] = useState({})
  const [selectedSale, setSelectedSale] = useState({})
  const [selectedAppointment, setSelectedAppointment] = useState({})


  const loadAutos = async () => {
    await request.get(urls.autos, setAutos)
  }
  const loadEmployees = async () => {
    await request.get(urls.employees, setEmployees)
  }
  const loadJobs = async () => {
    await request.get(urls.jobs, setJobs)
  }
  const loadManufacturers = async () => {
    await request.get(urls.manufacturers, setManufacturers)
  }
  const loadModels = async () => {
    await request.get(urls.models, setModels)
  }
  const loadPendingSales = async () => {
    await request.get(urls.sales, setPendingSales)
  }
  const loadServiceAppointments = async () => {
    await request.get(urls.appointments, setServiceAppointments)
  }


  const store = {
    urls: urls,
    request: request,

    autos: autos,
    employees: employees,
    jobs: jobs,
    manufacturers: manufacturers,
    models: models,
    pendingSales: pendingSales,
    serviceAppointments: serviceAppointments,

    setAutos: setAutos,
    setEmployees: setEmployees,
    setJobs: setJobs,
    setManufacturers: setManufacturers,
    setModels: setModels,
    setPendingSales: setPendingSales,
    setServiceAppointments: setServiceAppointments,

    loadAutos: loadAutos,
    loadEmployees: loadEmployees,
    loadJobs: loadJobs,
    loadManufacturers: loadManufacturers,
    loadModels: loadModels,
    loadPendingSales: loadPendingSales,
    loadServiceAppointments: loadServiceAppointments,

    addAppointmentModal: addAppointmentModal,
    addEmployeeModal: addEmployeeModal,
    addManufacturerModal: addManufacturerModal,
    addModelModal: addModelModal,
    addSaleModal: addSaleModal,
    addVehicleModal: addVehicleModal,

    editAppointmentModal: editAppointmentModal,
    editEmployeeModal: editEmployeeModal,
    editManufacturerModal: editManufacturerModal,
    editModelModal: editModelModal,
    editSaleModal: editSaleModal,
    editVehicleModal: editVehicleModal,

    setAddVehicleModal: setAddVehicleModal,
    setAddManufacturerModal: setAddManufacturerModal,
    setAddModelModal: setAddModelModal,
    setAddSaleModal: setAddSaleModal,
    setAddEmployeeModal: setAddEmployeeModal,
    setAddAppointmentModal: setAddAppointmentModal,

    setEditVehicleModal: setEditVehicleModal,
    setEditManufacturerModal: setEditManufacturerModal,
    setEditModelModal: setEditModelModal,
    setEditSaleModal: setEditSaleModal,
    setEditEmployeeModal: setEditEmployeeModal,
    setEditAppointmentModal: setEditAppointmentModal,

    deleteModal: deleteModal,
    selection: selection,
    setDeleteModal: setDeleteModal,
    setSelection: setSelection,

    selectedAppointment: selectedAppointment,
    selectedSale: selectedSale,
    selectedVehicle: selectedVehicle,

    setSelectedAppointment: setSelectedAppointment,
    setSelectedSale: setSelectedSale,
    setSelectedVehicle: setSelectedVehicle,


  }
  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  )
}

export const useStore = () => useContext(ContextStore)


