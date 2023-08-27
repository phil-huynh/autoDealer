import { useEffect } from "react";
import { useStore } from "./ContextStore";
import EditVehicle from "./EditVehicle";
import AddVehicle from "./AddVehicle";

let ListAutos = () => {

  const { autos, loadAutos, urls, request, editVehicleModal, setEditVehicleModal, addVehicleModal, setAddVehicleModal } = useStore()

  useEffect(() => {
    loadAutos()
  }, [])

  const deleteAuto = (vin) => {
    request.delete(urls.vehicle(vin), loadAutos)
  }

  return (
    <div style={{marginTop: "3rem"}}>
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Vehicles</h2>
        <button className="btn btn-success" onClick={() => setAddVehicleModal(true)}>Add a Vehicle</button>
      </div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Odometer</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {autos?.map(auto => (
          <tr key={auto.id}>
            <td>{auto.vin}</td>
            <td>{auto.model.manufacturer.name}</td>
            <td>{auto.model.name}</td>
            <td>{auto.year}</td>
            {auto.odometer ?
              <td>{auto.odometer.toLocaleString('en-US')}</td> : <td>Unknown</td>
            }
            <td>{auto.color}</td>
            <td>{`$${auto.price.toLocaleString('en-US')}`}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => (deleteAuto(auto.vin))}
              >
              Delete
            </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => setEditVehicleModal(true)}
              >
                Edit
            </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {addVehicleModal === true && <AddVehicle/>}
      {editVehicleModal === true && <EditVehicle/>}
    </div>

  )
}

export default ListAutos;