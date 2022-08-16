let ListAppointments = ({appointments}) => {
  return (
    <div>
      <h2>Appointments</h2>
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
        {appointments ? appointments.map((appointment) => {
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
            </tr>
          )
        }): null}
        </tbody>
      </table>
    </div>

  )
}

export default ListAppointments;