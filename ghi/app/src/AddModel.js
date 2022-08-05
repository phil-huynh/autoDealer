import React from 'react';

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      manufacturer_id:'',
      manufacturers: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e){
    e.preventDefault();
    const data = {...this.state};
    delete data.manufacturers
    let {manufacturers, models, autos, updateData, loadModels} = this.props
    const url = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      this.setState({
        name: '',
        manufacturer_id: '',
      });
      updateData(loadModels, manufacturers, models, autos)
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Model</h1>
            <form onSubmit={this.handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.name} placeholder="Model" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.manufacturer_id} required name="manufacturer_id" id="manufucturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map((manufacturer) => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddVehicle;