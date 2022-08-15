import { useState, useEffect } from "react";

const AddManufacturer = ({updateManufacturers}) => {

  const [name, setName] = useState('')

  const handleChange = (e) => {setName(e.target.value)}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {name: name};
    const url = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName('')
      updateManufacturers()
    }
  }
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={name} placeholder="Manufacturer" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default AddManufacturer;