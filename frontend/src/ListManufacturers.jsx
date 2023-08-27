import { useEffect } from "react";
import { useStore } from "./ContextStore";
import AddManufacturer from "./AddManufacturer";

let ListManufacturers = () => {

  const { manufacturers, loadManufacturers, urls, request, addManufacturerModal, setAddManufacturerModal } = useStore()

  useEffect(() => {
    loadManufacturers()
  }, [])

  const removeManufacturer = (id) => {
    request.delete(urls.manufacturer(id), loadManufacturers)
  }

  return (
    <div style={{marginTop: "3rem"}}>
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Manufacturers</h2>
        <button className="btn btn-success" onClick={() => setAddManufacturerModal(true)}>Add a Manufacturer</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {manufacturers?.sort().map(manufacturer => (
          <tr key={manufacturer.id}>
            <td>{manufacturer.name}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => removeManufacturer(manufacturer.id)}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {addManufacturerModal && <AddManufacturer/>}
    </div>
  )
}

export default ListManufacturers;