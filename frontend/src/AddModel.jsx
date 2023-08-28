import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import { useStore } from "./ContextStore.jsx";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  p: 4.5,
};


export default function AddModel() {
  const {
    manufacturers,
    loadManufacturers,
    request,
    urls,
    addModelModal,
    setAddModelModal,
    loadModels
  } = useStore()

  useEffect(() => {
    loadManufacturers()
  }, [])


  const emptyData = {
    name: '',
    manufacturer_id:''
  }

  const [data, setData] = useState(emptyData)
  const reset = () => setData(emptyData)

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request.post(urls.models, data, reset)
    loadModels()
    setAddModelModal(false)
  }

  // const textColor = () => (darkMode ? "white" : "black");

  console.log(manufacturers)

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addModelModal}
        // onClose={() => setAddModelModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addModelModal}>
          <Paper
            sx={style}
            elevation={10}
          >
            <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
              <h2>Add a Model</h2>
              <CloseIcon onClick={() => setAddModelModal(false)} sx={{cursor: "pointer"}}/>
            </div>
          <form id="create-model-form">
            <div className="form-floating mb-3">
              <input
                required
                className="form-control"
                type="text"
                id="name"
                placeholder="Model"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="mb-3">
              <select
                required
                className="form-select"
                id="manufucturer"
                name="manufacturer_id"
                value={data.manufacturer_id}
                onChange={handleChange}
              >
                <option value="">Choose a manufacturer</option>
                {manufacturers?.map(manufacturer => (
                    <option
                      key={manufacturer.id}
                      value={manufacturer.id}
                    >
                      {manufacturer.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="btn btn-secondary" onClick={() => setAddModelModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft: "2rem"}}>Create</button>
            </div>
          </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
