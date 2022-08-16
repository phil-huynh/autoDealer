import {useState, useEffect} from 'react';

const AddAppointment = ({employees, updateAppointments}) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vin, setVin] = useState('')
  const [dateAndTime, setDateAndTime] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDesciption] = useState('')
  const [technician, setTechnician] = useState('')

  const handleFNChange = (e) => setFirstName(e.target.value)
  const handleLNChange = (e) => setLastName(e.target.value)
  const handleVinChange = (e) => setVin(e.target.value)
  const handleDateAndTimeChange = (e) => setDateAndTime(e.target.value)
  const handleReasonChange = (e) => setReason(e.target.value)
  const handleDescriptionChange = (e) => setDesciption(e.target.value)
  const handleTechnicianChange = (e) => setTechnician(e.target.value)

  const handleSubmit = async (e) => {
        e.preventDefault();
        let dt = new Date(dateAndTime).toISOString()
        const data = {
          first_name: firstName,
          last_name: lastName,
          vin: vin,
          date_and_time: dt,
          reason: reason,
          description: description,
          technician: technician
        };
        console.log("🚀 ~ file: AddAppointment.js ~ line 33 ~ handleSubmit ~ data", data)
        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setFirstName('')
          setLastName('')
          setVin('')
          setDateAndTime('')
          setReason('')
          setDesciption('')
          setTechnician('')
          updateAppointments()
        }
      }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Appointment</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFNChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleLNChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" maxLength="17" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleDateAndTimeChange} value={dateAndTime} placeholder="Date and Time" required type="datetime-local" name="dateAndTime" id="dateAndTime" className="form-control" />
              <label htmlFor="dateAndTime">Date and Time</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleReasonChange} value={reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className='mb-3'>
              <textarea onChange={handleDescriptionChange} value={description}className="form-control" id="description" rows="3" name="description" ></textarea>
            </div>
            <div className="mb-3">
              <select onChange={handleTechnicianChange} value={technician} required name="technician" id="technician" className="form-select">
                <option value=""></option>
                {employees ? employees.filter((employee) => {
                  return employee.job.title === "Technician"
                }).map((technician) => {
                  return (
                    <option
                      key={technician.employee_number}
                      value={technician.employee_number}
                    >{technician.first_name} {technician.last_name}</option>
                  )
                }):null}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAppointment;