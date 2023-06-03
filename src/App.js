import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CarsList from "./components/cars-list.component";
import AddCar from "./components/add-car.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
             <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Vehicle List
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CarsList/>} />            
            <Route path="/add-car" element={<AddCar/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;