const ListEmployees = ({employees}) => {
  return (
    <div>
      <h2>Employees</h2>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee Number</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
        {employees ? employees.map((employee) => (
          <tr key={employee.employee_number}>
            <td>{employee.last_name}</td>
            <td>{employee.first_name}</td>
            <td>{employee.employee_number}</td>
            <td>{employee.job.title}</td>
          </tr>
        )): null}
        </tbody>
      </table>
    </div>

  )
}

export default ListEmployees;