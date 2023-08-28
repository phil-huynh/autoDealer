import { useEffect } from "react";
import { useStore } from "./ContextStore";
import AddModel from "./AddModel";

const Models = () => {

  const { models, loadModels, urls, request, setAddModelModal, addModelModal } = useStore()

  useEffect(() => {
    loadModels()
  }, [])


  const removeModel = (id) => {
    request.delete(urls.model(id), loadModels)
  }

  return (

    <div style={{marginTop: "3rem"}}>
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
                onClick={() => removeModel(model.id)}
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