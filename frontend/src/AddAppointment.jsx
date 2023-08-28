import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "./ContextStore.jsx";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  p: 4.5,
};


export default function AddAppointment() {

  const {
    employees,
    loadEmployees,
    request,
    urls,
    addAppointmentModal,
    setAddAppointmentModal,
    loadServiceAppointments
  } = useStore()

  useEffect(() => {
    loadEmployees()
  }, [])


  const emptyData = {
    first_name: '',
    last_name: '',
    vin: '',
    date_and_time: '',
    reason: '',
    description: '',
    technician: ''
  }

  const [appointmentData, setAppointmentData] = useState(emptyData)
  const reset = () => setAppointmentData(emptyData)

  const handleChange = e => {
    setAppointmentData({...appointmentData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setAppointmentData(
      {
        ...appointmentData,
        date_and_time: new Date(appointmentData.date_and_time).toISOString()
      }
    )
    await request.post(urls.appointments, appointmentData, reset)
    loadServiceAppointments()
    setAddAppointmentModal(false)
  }

  // const textColor = () => (darkMode ? "white" : "black");

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addAppointmentModal}
        // onClose={() => setAddAppointmentModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addAppointmentModal}>
          <Paper
            sx={style}
            elevation={10}
          >
          <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
            <h2>Add Appointment</h2>
            <CloseIcon onClick={() => setAddAppointmentModal(false)} sx={{cursor: "pointer"}}/>
          </div>
          <form id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={appointmentData.first_name} placeholder="First Name" required type="text" name="first_name" id="firstName" className="form-control" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={appointmentData.last_name} placeholder="Last Name" required type="text" name="last_name" id="lastName" className="form-control" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={appointmentData.vin} placeholder="VIN" required type="text" name="vin" id="vin" maxLength="17" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={appointmentData.date_and_time} placeholder="Date and Time" required type="datetime-local" name="date_and_time" id="dateAndTime" className="form-control" />
              <label htmlFor="dateAndTime">Date and Time</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={appointmentData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className='mb-3'>
              <textarea onChange={handleChange} value={appointmentData.description}className="form-control" id="description" rows="3" placeholder="Description" name="description" ></textarea>
            </div>
            <div className="mb-3">
              <select onChange={handleChange} value={appointmentData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Technician</option>
                {employees?.filter(employee => employee.job.title === "Technician")
                  .map(technician => (
                    <option
                      key={technician.employee_number}
                      value={technician.employee_number}
                    >
                      {technician.first_name} {technician.last_name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="btn btn-secondary" onClick={() => setAddAppointmentModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft: "2rem"}}>Create</button>
            </div>
          </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
