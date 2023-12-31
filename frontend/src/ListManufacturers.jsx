import { useEffect } from "react";
import { useStore } from "./ContextStore";
import AddManufacturer from "./AddManufacturer";
import DeleteModal from "./DeleteModal";

let ListManufacturers = () => {

  const {
    manufacturers,
    loadManufacturers,
    urls,
    addManufacturerModal,
    setAddManufacturerModal,
    selection,
    setSelection,
    deleteModal,
    setDeleteModal
  } = useStore()

  useEffect(() => {
    loadManufacturers()
  }, [])

  useEffect(() => {
    selection && setDeleteModal(true)
  }, [selection])

  // const removeManufacturer = (id) => {
  //   request.delete(urls.manufacturer(id), loadManufacturers)
  // }

  return (
    <div style={{marginTop: "3rem"}}>
      {deleteModal ?
        <DeleteModal
          url={urls.manufacturer(selection.id)}
          callback={loadManufacturers}
          setSelection={setSelection}
          item={selection.name}
          />
        :
        null
      }
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
                onClick={() => setSelection(manufacturer)}
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
      {addManufacturerModal && <AddManufacturer/>}
    </div>
  )
}

export default ListManufacturers;