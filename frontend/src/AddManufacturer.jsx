import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
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


export default function AddManufacturer() {
  const {
    request,
    urls,
    loadManufacturers,
    addManufacturerModal,
    setAddManufacturerModal,
  } = useStore()

  const emptyData = { name: '' }

  const [data, setData] = useState(emptyData)
  const reset = () => setData(emptyData)

  const handleChange = e => {
    setData({ [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request.post(urls.manufacturers, data, reset)
    loadManufacturers()
    setAddManufacturerModal(false)
  }

  // const textColor = () => (darkMode ? "white" : "black");

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addManufacturerModal}
        onClose={() => setAddManufacturerModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addManufacturerModal}>
          <Paper
            sx={style}
            elevation={10}
          >
            <h1>Add a Model</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={data.name} placeholder="Manufacturer" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Manufacturer</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
