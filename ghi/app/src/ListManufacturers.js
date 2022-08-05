let ListManufacturers = ({manufacturers}) => {
  return (
    <div>
      <h2>Manufacturers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {manufacturers.map((manufacturer) => (
          <tr key={manufacturer.id}>
            <td>{manufacturer.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListManufacturers;