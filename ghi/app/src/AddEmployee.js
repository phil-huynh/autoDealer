import {useState, useEffect} from 'react';

const AddEmployee = ({joblist, updateEmployees}) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState([])

  useEffect(()=>{
    setJobs(joblist)
  }, [joblist])

  const handleFNChange = (e) => setFirstName(e.target.value)
  const handleLNChange = (e) => setLastName(e.target.value)
  const handleJobChange = (e) => setJob(e.target.value)

  const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          first_name: firstName,
          last_name: lastName,
          job: job
        };
        const url = 'http://localhost:8070/api/employees/';
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
          setJob(0)
          updateEmployees()
        }
      }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Employee</h1>
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
              <select onChange={handleJobChange} value={job} required name="job" id="job" className="form-select">
                <option value=""></option>
                {jobs ? jobs.map((jb) => {
                  return (
                    <option key={jb.id} value={jb.id}>{jb.title}</option>
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

export default AddEmployee;