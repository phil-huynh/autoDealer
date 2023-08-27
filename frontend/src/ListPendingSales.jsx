import { useEffect } from "react"
import { useStore } from "./ContextStore"
import AddPendingSale from "./AddPendingSale"

let ListPendingSales = () => {

  const { pendingSales, loadPendingSales, urls, request, addSaleModal, setAddSaleModal } = useStore()

  useEffect(() => {
    loadPendingSales()
  }, [])

  console.log("in the component", pendingSales)

  const removeSale = (id) => {
    request.delete(urls.sale(id), loadPendingSales)
  }

  return (
    <div style={{marginTop: "3rem"}}>
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
          console.log("the sale", sale)
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
                  onClick={() => removeSale(sale.interaction_number)}
                >
                  DELETE
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