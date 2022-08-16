import {useState, useEffect} from 'react';

const AddPendingSale = ({autos, employees, updatePendingSales}) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [salesPerson, setSalesPerson] = useState('')

  const handleFNChange = (e) => setFirstName(e.target.value)
  const handleLNChange = (e) => setLastName(e.target.value)
  const handleVehicleChange = (e) => setVehicle(e.target.value)
  const handleSalesPersonChange = (e) => setSalesPerson(e.target.value)

  const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          first_name: firstName,
          last_name: lastName,
          vehicle: vehicle,
          sales_person: salesPerson
        };
        const url = 'http://localhost:8090/api/pending-sales/';
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
          setVehicle('')
          setSalesPerson('')
          updatePendingSales()
        }
      }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Pending Sale</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFNChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleLNChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="mb-3">
              <select onChange={handleVehicleChange} value={vehicle} required name="vehicle" id="vehicle" className="form-select">
                <option value=""></option>
                {autos ? autos.filter((auto) => {
                  return !auto.pending
                }).map((vehicle) => {
                  return (
                    <option
                      key={vehicle.vin}
                      value={vehicle.vin}
                    >{vehicle.vin} -- {vehicle.model.manufacturer.name} {vehicle.model.name} -- {vehicle.color}</option>
                  )
                }):null}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleSalesPersonChange} value={salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
                <option value=""></option>
                {employees ? employees.filter((employee) => {
                  return employee.job.title === "Sales Person"
                }).map((salesPerson) => {
                  return (
                    <option
                      key={salesPerson.employee_number}
                      value={salesPerson.employee_number}
                    >{salesPerson.first_name} {salesPerson.last_name}</option>
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

export default AddPendingSale;