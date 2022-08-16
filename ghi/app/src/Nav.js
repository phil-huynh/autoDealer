import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/manufacturers">List Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">Add Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/models">List Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/models/new">Add a Model</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/automobiles">List Vehicles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/automobiles/new">Add a Vehicle</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/employees">List Employees</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/employees/new">Add Employee</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/appointments">List Serivce Appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/appointments/new">Add Serivce Appointment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/pending-sales">List Pending Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/pending-sales/new">Add Potential Sale</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
