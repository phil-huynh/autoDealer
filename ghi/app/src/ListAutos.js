let ListAutos = ({autos}) => {
  return (
    <div>
      <h2>Vehicles</h2>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
        {autos ? autos.map((auto) => (
          <tr key={auto.id}>
            <td>{auto.vin}</td>
            <td>{auto.color}</td>
            <td>{auto.year}</td>
            <td>{auto.model.name}</td>
            <td>{auto.model.manufacturer.name}</td>
          </tr>
        )): null}
        </tbody>
      </table>
    </div>

  )
}

export default ListAutos;