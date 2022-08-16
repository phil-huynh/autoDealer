import { useState, useEffect} from 'react'

const AddVehicle = ({models, manufacturers, updateAutos}) => {

  const[color, setColor] = useState('')
  const[year, setYear] = useState(0)
  const[vin, setVin] = useState('')
  const[model_id, setModelId] = useState('')
  const[make, setMake] = useState('all')
  const[odometer, setOdometer] = useState('')

  const handleColorChange = (e) => setColor(e.target.value)
  const handleYearChange = (e) => setYear(e.target.value)
  const handleVinChange = (e) => setVin(e.target.value)
  const handleModelIdChange = (e) => setModelId(e.target.value)
  const handleMakeChange = (e) => setMake(e.target.value)
  const handleOdodmeterChange = (e) => setOdometer(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      color: color,
      year: year,
      vin: vin,
      model_id: model_id,
      odometer: odometer
    };

    const url = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setColor('')
      setYear(0)
      setVin('')
      setModelId(0)
      setMake('all')
      setOdometer(0)
      updateAutos()
    }
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Vehicle</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleYearChange} value={year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" maxLength="17" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleOdodmeterChange} value={odometer} placeholder="Odometer" required type="number" name="odometer" id="odometer" className="form-control" />
              <label htmlFor="odometer">Odometer</label>
            </div>
            <div className="mb-3">
              <select onChange={handleMakeChange} value={make}  name="make" id="make" className="form-select">
                <option value="all">All Manufacturers</option>
                {manufacturers? manufacturers.map((make) => {
                  return (
                    <option key={make.id} value={make.name}>{make.name}</option>
                  )
                }):null}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleModelIdChange} value={model_id} required name="model_id" id="model_id" className="form-select">
                <option value="">Choose a Model</option>
                {models ? models.filter((value) => {
                  if(make === 'all') {
                    return value
                  }
                  else {
                    return value.manufacturer.name === make
                  }
                }).map((model) => {
                  return (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  )}
                ): null}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default AddVehicle;