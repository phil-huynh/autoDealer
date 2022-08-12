let Models = ({models}) => {
  return (

    <div>
      <h2>Models</h2>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
        {models ? models.map((model) => (
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.manufacturer.name}</td>
            <td>
              <img src={model.picture_url} alt="Unavailable" width="330" height="190"/>
            </td>
          </tr>
        )): null}
        </tbody>
      </table>
    </div>

  )
}

export default Models;