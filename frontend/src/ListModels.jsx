import { useEffect } from "react";
import { useStore } from "./ContextStore";
import AddModel from "./AddModel";
import DeleteModal from "./DeleteModal";

const Models = () => {

  const {
    models,
    loadModels,
    urls,
    setAddModelModal,
    addModelModal,
    selection,
    setSelection,
    deleteModal,
    setDeleteModal
  } = useStore()

  useEffect(() => {
    loadModels()
  }, [])

  useEffect(() => {
    selection && setDeleteModal(true)
  }, [selection])

  return (

    <div style={{marginTop: "3rem"}}>
      {deleteModal ?
        <DeleteModal
          url={urls.model(selection.id)}
          callback={loadModels}
          setSelection={setSelection}
          item={`${selection.manufacturer.name} ${selection.name}`}
          />
        :
        null
      }
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Models</h2>
        <button className="btn btn-success" onClick={() => setAddModelModal(true)}>Add a Model</button>
      </div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            {/* <th>Picture</th> */}
          </tr>
        </thead>
        <tbody>
        {models?.map(model => (
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.manufacturer.name}</td>
            {/* <td>
              <img src={model.picture_url} alt="Unavailable" width="330" height="190"/>
            </td> */}
            <td>
              <button
                className="btn btn-danger"
                onClick={() => setSelection(model)}
              >
                Delete
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
      {addModelModal && <AddModel />}
    </div>

  )
}

export default Models;