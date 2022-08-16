let ListPendingSales = ({pendingSales}) => {
  return (
    <div>
      <h2>Pending Sales</h2>
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
        {pendingSales ? pendingSales.map((sale) => {
          let date = new Date(sale.date_and_time).toLocaleDateString()
          let time = new Date(sale.date_and_time).toLocaleTimeString()
          let formattedTime = time.slice(0, time.length - 6) + ' ' + time.slice(time.length-2,time.length)
          return (
            <tr key={sale.interaction_number}>
              <td>{sale.interaction_number}</td>
              <td>{sale.last_name}, {sale.first_name}</td>
              <td>{sale.vehicle.vin}</td>
              <td>{date}</td>
              <td>{formattedTime}</td>
              <td>{sale.vehicle.price}</td>
              <td>{sale.salesPerson.first_name} {sale.salesPerson.last_name}</td>
            </tr>
          )
        }): null}
        </tbody>
      </table>
    </div>

  )
}

export default ListPendingSales;