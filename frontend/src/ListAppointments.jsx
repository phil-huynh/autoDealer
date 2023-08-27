import { useEffect } from "react"
import { useStore } from "./ContextStore"
import AddAppointment from "./AddAppointment"

let ListAppointments = () => {

  const { serviceAppointments, loadServiceAppointments, urls, request, addAppointmentModal, setAddAppointmentModal} = useStore()

  useEffect(() => {
    loadServiceAppointments()
  }, [])

  const cancel = (id) => {
    request.delete(urls.appointment(id), loadServiceAppointments)
  }

  return (
    <div style={{marginTop: "3rem"}}>
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Service Appointments</h2>
        <button className="btn btn-success" onClick={() => setAddAppointmentModal(true)}>Add an Appointment</button>
      </div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Appt #</th>
            <th>Name</th>
            <th>VIN</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
        {serviceAppointments?.map(appointment => {
          let date = new Date(appointment.date_and_time).toLocaleDateString()
          let time = new Date(appointment.date_and_time).toLocaleTimeString()
          let formattedTime = time.slice(0, time.length - 6) + ' ' + time.slice(time.length-2,time.length)
          return (
            <tr key={appointment.ticket_number}>
              <td>{appointment.ticket_number}</td>
              <td>{appointment.last_name}, {appointment.first_name}</td>
              <td>{appointment.vin}</td>
              <td>{date}</td>
              <td>{formattedTime}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => cancel(appointment.ticket_number)}
                >
                  CANCEL
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      {addAppointmentModal && <AddAppointment/>}
    </div>

  )
}

export default ListAppointments;