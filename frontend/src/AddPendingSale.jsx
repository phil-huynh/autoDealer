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


export default function AddPendingSale() {
  const {
    autos,
    loadAutos,
    employees,
    loadEmployees,
    request,
    urls,
    addSaleModal,
    setAddSaleModal,
    loadPendingSales
  } = useStore()

  useEffect(() => {
    loadAutos()
    loadEmployees()
  }, [])

  const emptyData = {
    first_name: '',
    last_name: '',
    vehicle: '',
    sales_person: ''
  }

  const [vehicleData, setVehicleData] = useState(emptyData)
  const reset = () => setVehicleData(emptyData)

  const handleChange = e => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request.post(urls.sales, vehicleData, reset)
    loadPendingSales()
    setAddSaleModal(false)
  }

  // const textColor = () => (darkMode ? "white" : "black");

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addSaleModal}
        // onClose={() => setAddSaleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addSaleModal}>
          <Paper
            sx={style}
            elevation={10}
          >
          <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
            <h2>Potential Sale</h2>
            <CloseIcon onClick={() => setAddSaleModal(false)} sx={{cursor: "pointer"}}/>
          </div>
          <form id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={vehicleData.first_name} placeholder="First Name" required type="text" name="first_name" id="firstName" className="form-control" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={vehicleData.last_name} placeholder="Last Name" required type="text" name="last_name" id="lastName" className="form-control" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="mb-3">
              <select onChange={handleChange} value={vehicleData.vehicle} required name="vehicle" id="vehicle" className="form-select">
                <option value="">VIN</option>
                {autos?.filter(auto => !auto.pending)
                .map(auto => (
                    <option
                      key={auto.vin}
                      value={auto.vin}
                    >{auto.vin} -- {auto.model.manufacturer.name} {auto.model.name} -- {auto.color}</option>
                  ))
                }
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleChange} value={vehicleData.sales_person} required name="sales_person" id="salesPerson" className="form-select">
                <option value="">Sales Person</option>
                {employees?.filter(employee => employee.job.title === "Sales Person")
                  .map(salesPerson => (
                    <option
                      key={salesPerson.employee_number}
                      value={salesPerson.employee_number}
                    >{salesPerson.first_name} {salesPerson.last_name}</option>
                  ))
                }
              </select>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="btn btn-secondary" onClick={() => setAddSaleModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft: "2rem"}}>Create</button>
            </div>
          </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
