import { useEffect } from "react"
import { useStore } from "./ContextStore"
import AddPendingSale from "./AddPendingSale"
import DeleteModal from "./DeleteModal"

let ListPendingSales = () => {

  const {
    pendingSales,
    loadPendingSales,
    urls,
    request,
    addSaleModal,
    setAddSaleModal,
    selection,
    setSelection,
    deleteModal,
    setDeleteModal
  } = useStore()

  useEffect(() => {
    loadPendingSales()
  }, [])

  useEffect(() => {
    selection && setDeleteModal(true)
  }, [selection])


  // const removeSale = (id) => {
  //   request.delete(urls.sale(id), loadPendingSales)
  // }

  return (
    <div style={{marginTop: "3rem"}}>
      {deleteModal ?
        <DeleteModal
          url={urls.sale(selection.interaction_number)}
          callback={loadPendingSales}
          setSelection={setSelection}
          item={`Potential sale for VIN#-${selection.vehicle.vin} to ${selection.first_name} ${selection.last_name}`}
          />
        :
        null
      }
      <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
        <h2>Pending Sales</h2>
        <button className="btn btn-success" onClick={() => setAddSaleModal(true)}>Add Sale</button>
      </div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Interaction #</th>
            <th>Name</th>
            <th>VIN</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Sales Person</th>
          </tr>
        </thead>
        <tbody>
        {pendingSales?.map(sale => {
          let date = new Date(sale.date_and_time).toLocaleDateString()
          let time = new Date(sale.date_and_time).toLocaleTimeString()
          let formattedTime = time.slice(0, time.length - 6) + ' ' + time.slice(time.length-2,time.length)
          return (
            <tr key={sale.interaction_number}>
              <td>{sale.interaction_number}</td>
              <td>{`${sale.last_name}, ${sale.first_name}`}</td>
              <td>{sale.vehicle.vin}</td>
              <td>{date}</td>
              <td>{formattedTime}</td>
              <td>{sale.vehicle.price}</td>
              <td>{`${sale.sales_person.first_name} ${sale.sales_person.last_name}`}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => setSelection(sale)}
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
          )
        })}
        </tbody>
      </table>
      {addSaleModal && <AddPendingSale/>}
    </div>

  )
}

export default ListPendingSales;