import React from 'react';

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      year: '',
      vin: '',
      model_id: '',
      models: [],
      makes: [],
      make:'',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
    const url2 = 'http://localhost:8100/api/manufacturers/';
    const response2 = await fetch(url2);
    if (response.ok) {
      const data = await response2.json();
      this.setState({ makes: data.manufacturers });
    }
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  async handleSubmit(e){
    e.preventDefault();
    const data = {...this.state};
    delete data.models
    delete data.makes
    delete data.make
    let {updateAutos} = this.props
    const url = 'http://localhost:8100/api/automobiles/';
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
        color:"",
        year:"",
        vin:"",
        model_id: "",
        make: ""

      });
      updateAutos()
    }
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Vehicle</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.vin} placeholder="VIN" required type="text" maxLength="17" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.make} required name="make" id="make" className="form-select">
                  <option value="all">All Manufacturers</option>
                  {this.state.makes ? this.state.makes.map((make) => {
                    return (
                      <option key={make.id} value={make.name}>{make.name}</option>
                    )
                  }):null}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.model_id} required name="model_id" id="model_id" className="form-select">
                  <option value="">Choose a Model</option>
                  {this.state.models.filter((value) => {
                    if(this.state.make === 'all') {
                      return value
                    }
                    else {
                      return value.manufacturer.name === this.state.make
                    }
                  }).map((model) => {
                    return (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    )}
                  )}
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