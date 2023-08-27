import { useEffect, useState } from "react";
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
        onClose={() => setAddModelModal(false)}
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
            <h1>Add a Model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input onChange={handleChange} value={data.name} placeholder="Model" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="mb-3">
              <select onChange={handleChange} value={data.manufacturer_id} required name="manufacturer_id" id="manufucturer" className="form-select">
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
            <button className="btn btn-primary">Create</button>
          </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
