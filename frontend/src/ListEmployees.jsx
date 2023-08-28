import { useEffect } from "react";
import { useStore } from "./ContextStore";
import AddEmployee from "./AddEmployee";

const ListEmployees = () => {

  const { employees, loadEmployees, urls, request, addEmployeeModal, setAddEmployeeModal} = useStore()

  useEffect(() => {
    loadEmployees()
  }, [])

  const deleteEmp = (id) => {
    request.delete(urls.employee(id), loadEmployees)
  }

  return (
    <div style={{marginTop: "3rem"}}>
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Employees</h2>
        <button className="btn btn-success" onClick={() => setAddEmployeeModal(true)}>Add an Employee </button>
      </div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Employee Number</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
        {employees?.map(employee => (
          <tr key={employee.employee_number}>
            <td>{employee.last_name}</td>
            <td>{employee.first_name}</td>
            <td>{employee.employee_number}</td>
            <td>{employee.job.title}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteEmp(employee.employee_number)}
              >
                DELETE
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                // onClick={() => setEditVehicleModal(true)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {addEmployeeModal && <AddEmployee/>}
    </div>

  )
}

export default ListEmployees;