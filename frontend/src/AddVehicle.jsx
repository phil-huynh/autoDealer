import { useEffect, useState } from "react";
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

export default function AddVehicle() {

  // const textColor = () => (darkMode ? "white" : "black");

  const {
    manufacturers,
    models,
    loadManufacturers,
    loadModels,
    loadAutos,
    request,
    urls,
    addVehicleModal,
    setAddVehicleModal
  } = useStore()

  useEffect(() => {
    loadManufacturers()
    loadModels()
  }, [])


  const emptyData = {
    color: '',
    year: 2020,
    vin: '',
    model_id: 0,
    odometer: 0,
    price: 0
  }

  const [vehicle, setVehicle] = useState(emptyData)
  const [make, setMake] = useState('')

  const reset = () => {
    setVehicle(emptyData)
    setMake('')
  }

  const handleMakeChange = e => setMake(e.target.value)

  const handleModelChange = e => {
    const currentModel = models.filter(model => model.id === Number(e.target.value))[0]
    !make && setMake(currentModel.manufacturer.name)
    setVehicle({ ...vehicle, [e.target.name]: e.target.value })
  }

  const handleChange = e => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request.post(urls.autos, vehicle, reset)
    loadAutos()
    setAddVehicleModal(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addVehicleModal}
        // onClose={() => setAddVehicleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addVehicleModal}>
          <Paper
            sx={style}
            elevation={10}
          >
            <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
              <h2>Add a Vehicle</h2>
              <CloseIcon onClick={() => setAddVehicleModal(false)} sx={{cursor: "pointer"}}/>
            </div>
            <form id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={vehicle.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={vehicle.year} placeholder="Year" min="1900" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={vehicle.vin} placeholder="VIN" required type="text" maxLength="17" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={vehicle.odometer} placeholder="Odometer" required type="number" name="odometer" id="odometer" className="form-control" />
                <label htmlFor="odometer">Odometer</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={vehicle.price} placeholder="Price" step="50" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
              </div>
              <div className="mb-3">
                <select onChange={handleMakeChange} value={make}  name="make" id="make" className="form-select">
                  <option value="">All Manufacturers</option>
                  {manufacturers?.map(make => (
                      <option key={make.id} value={make.name}>{make.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleModelChange} value={vehicle.model_id} required name="model_id" id="model_id" className="form-select">
                  <option value="">Choose a Model</option>
                  {models?.filter(value => make ? value.manufacturer.name === make : value)
                    .map(model => (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    ))
                  }
                </select>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button className="btn btn-secondary" onClick={() => setAddVehicleModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft: "2rem"}}>Create</button>
              </div>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
