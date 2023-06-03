import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";

export default class CarsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMake = this.onChangeSearchMake.bind(this);
    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);
    this.searchMake = this.searchMake.bind(this);

    this.state = {
      cars: [],
      currentCar: null,
      currentIndex: -1,
      searchMake: ""
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

  onChangeSearchMake(e) {
    const searchMake = e.target.value;
    
    this.setState({
      searchMake: searchMake
    });
  }

  retrieveCars() {
    CarDataService.getAll()
      .then(response => {
          console.log(response);
        this.setState({
          cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCars();
    this.setState({
      currentCar: null,
      currentIndex: -1
    });
  }

  setActiveCar(car, index) {
    this.setState({
      currentCar: car,
      currentIndex: index
    });
  }

  removeAllCars() {
    CarDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchMake() {
    this.setState({
      currentCar: null,
      currentIndex: -1
    });

    CarDataService.findByMake(this.state.searchMake)
      .then(response => {
        this.setState({
          cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchMake, cars, currentCar, currentIndex } = this.state;

    return (
      <div className="list-holder">
        <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                    <Link to={"/add-car"} className="add-btn">
                      Add Vehicle
                    </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="header-holder">
                  <h4>Vehicles List</h4>
                </div>
              

                <ul className="list-group">
                  {cars &&
                    cars.map((car, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveCar(car, index)}
                        key={index}
                      >
                        {car.make}
                      </li>
                    ))}
                </ul>

              </div>
              <div className="col-md-6">
            {currentCar ? (
              <div className="car-detail">
                <div>
                  <div className="header">
                      <h4>Car Detail</h4>
                  </div>

                    <div>
                      <label>
                        <strong>Make</strong>
                      </label>{" "}
                      {currentCar.make}
                    </div>
                    <div>
                      <label>
                        <strong>Model</strong>
                      </label>{" "}
                      {currentCar.model}
                    </div>
                      <div>
                      <label>
                        <strong>Reg</strong>
                      </label>{" "}
                      {currentCar.reg}
                    </div>


                    <Link
                      to={"/cars/" + currentCar.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                  </div>
              </div>
                 
                ) : (
                  <div>
                    <br />
                  </div>
                )}
              </div>
            </div>
      </div>
    
    );
  }
}