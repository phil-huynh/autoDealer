let ListAutos = ({autos}) => {
  return (
    <div>
      <h2>Vehicles</h2>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Odometer</th>
            <th>Color</th>
            <th>VIN</th>
          </tr>
        </thead>
        <tbody>
        {autos ? autos.map((auto) => (
          <tr key={auto.id}>
            <td>{auto.model.manufacturer.name}</td>
            <td>{auto.model.name}</td>
            <td>{auto.year}</td>
            {auto.odometer ? <td>{auto.odometer}</td>: null}
            <td>{auto.color}</td>
            <td>{auto.vin}</td>
          </tr>
        )): null}
        </tbody>
      </table>
    </div>

  )
}

export default ListAutos;