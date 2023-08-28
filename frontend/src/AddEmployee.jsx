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


export default function AddEmployee() {
  const {
    jobs,
    loadJobs,
    request,
    urls,
    addEmployeeModal,
    setAddEmployeeModal,
    loadEmployees
  } = useStore()

  useEffect(()=>{
    loadJobs()
  }, [])

  const emptyData = {
    first_name: '',
    last_name: '',
    job: ''
  }

  const [employeeData, setEmployeeData] = useState(emptyData)
  const reset = () => setEmployeeData(emptyData)

  const handleChange = e => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request.post(urls.employees, employeeData, reset)
    loadEmployees()
    setAddEmployeeModal(false)
  }

  // const textColor = () => (darkMode ? "white" : "black");

  return (
    <div>
      <Modal
        aria-labelledby="opportunity-data-card"
        aria-describedby="opportunity-probability-data"
        open={addEmployeeModal}
        onClose={() => setAddEmployeeModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={addEmployeeModal}>
          <Paper
            sx={style}
            elevation={10}
          >
            <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
              <h2>New Employee</h2>
              <CloseIcon onClick={() => setAddEmployeeModal(false)} sx={{cursor: "pointer"}}/>
            </div>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={employeeData.first_name} placeholder="First Name" required type="text" name="first_name" id="firstName" className="form-control" />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={employeeData.last_name} placeholder="Last Name" required type="text" name="last_name" id="lastName" className="form-control" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="mb-3">
                <select onChange={handleChange} value={employeeData.job} required name="job" id="job" className="form-select">
                  <option value="">Job Title</option>
                  {jobs?.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))
                  }
                </select>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="btn btn-secondary" onClick={() => setAddEmployeeModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft: "2rem"}}>Create</button>
            </div>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
