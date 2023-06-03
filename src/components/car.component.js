import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { withRouter } from '../common/with-router';

class Car extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeReg = this.onChangeReg.bind(this);
    this.getCar = this.getCar.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);

    this.state = {
      currentCar: {
        n: null,
        user_n: 0,
        make: "", 
        model: "", 
        reg: "", 
        assoc: "", 
        assoc_n: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCar(this.props.router.params.id);
  }

  onChangeMake(e) {
    const make = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          make: make
        }
      };
    });
  }

  onChangeModel(e) {
    const model = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        model: model
      }
    }));
  }

  onChangeReg(e) {
    const reg = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        reg: reg
      }
    }));
  }

  getCar(id) {
    CarDataService.get(id)
      .then(response => {
        this.setState({
          currentCar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateCar() {
    CarDataService.update(
      this.state.currentCar.id,
      this.state.currentCar
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The car was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCar() {    
    CarDataService.delete(this.state.currentCar.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/cars');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCar } = this.state;

    return (
      <div>
        {currentCar ? (
          <div className="edit-form">
            <h4>Car</h4>
            <form>
              <div className="form-group">
                <label htmlFor="make">Make</label>
                <input
                  type="text"
                  className="form-control"
                  id="make"
                  value={currentCar.make}
                  onChange={this.onChangeMake}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentCar.model}
                  onChange={this.onChangeModel}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCar.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCar.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCar}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCar}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Car...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Car);