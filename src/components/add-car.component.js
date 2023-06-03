import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class AddCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeReg = this.onChangeReg.bind(this);
    this.saveCar = this.saveCar.bind(this);
    this.newCar = this.newCar.bind(this);

    this.state = {
      n: null,
      user_n: 0,
      make: "", 
      model: "", 
      reg: "", 
      assoc: "", 
      assoc_n: "",

      submitted: false
    };
  }

  onChangeMake(e) {
    this.setState({
      make: e.target.value
    });
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

   onChangeReg(e) {
    this.setState({
      reg: e.target.value
    });
  }

  saveCar() {
    var data = {
      user_n: 0,
      make: this.state.make,
      model: this.state.model,
      reg: this.state.reg,
      assoc: "", 
      assoc_n: ""
    };

    CarDataService.create(data)
      .then(response => {
        this.setState({
          n: response.data.n,
          make: response.data.make,
          model: response.data.model,
          reg: response.data.reg,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCar() {
    this.setState({
      n: null,
      user_n: 0,
      make: "", 
      model: "", 
      reg: "", 
      assoc: "", 
      assoc_n: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="success-msg-holder">
            <h4>You submitted successfully!</h4>
            <button className="add-btn" onClick={this.newCar}>
              Add Another Vehicle
            </button>
          </div>
        ) : (
            
            <div>
                <div className="header-holder">
                  <h4>Add Vehicle</h4>
              </div>
              
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                className="form-control"
                id="make"
                required
                value={this.state.make}
                onChange={this.onChangeMake}
                name="make"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
              </div>
              
               <div className="form-group">
              <label htmlFor="reg">Reg Number</label>
              <input
                type="text"
                className="form-control"
                id="reg"
                required
                value={this.state.reg}
                onChange={this.onChangeReg}
                name="reg"
              />
            </div>

            <button onClick={this.saveCar}  className="add-btn">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}