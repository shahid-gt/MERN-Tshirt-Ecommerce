import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";



const adminLeftSide = () => {
  return (
    <div className="card text-center rounded border border-dark rounded-3 border-4">
      <h4 className="card-header bg-dark text-white ">Admin Navigation</h4>
      <ul className="list-group">
          <li className="list-group-item">
              <Link to="/admin/create/category" className="nav-link text-success h5">Create Categories</Link>
          </li>
          <li className="list-group-item">
              <Link to="/admin/categories" className="nav-link text-success h5">Manage Categories</Link>
          </li>
          <li className="list-group-item">
              <Link to="/admin/create/product" className="nav-link text-success h5">Create Products</Link>
          </li>
          <li className="list-group-item">
              <Link to="/admin/products" className="nav-link text-success h5">Manage Products</Link>
          </li>
          <li className="list-group-item">
              <Link to="/admin/orders" className="nav-link text-success h5">Manage Orders</Link>
          </li>
      </ul>
    </div>
  );
};

const adminRightSide = () => {
    const {user : {name ,email,role} } = isAuthenticated() ;
    return (
        <div className="card mb-4">
          <h4 className="card-header">Admin Information</h4>
          <ul className="list-group">
            <li className="list-group-item">
            <h5><span className="badge bg-success me-4"> Name: </span>{name}</h5>
            </li>
            <li className="list-group-item">
              <h5><span className="badge bg-success me-4"> Email: </span>{email}</h5>
            </li>
  
            <li className="list-group-item">
              <h5><span className="badge bg-danger me-4">Admin Area</span></h5>
            </li>
          </ul>
        </div>
      );
  
};
export default function AdminDashBoard() {
    

  return (
    <div>
      <Base
        title="Welcome to admin panel"
        description="Manage all products here."
        className="bg-success p-4"
      >
        <div className="row">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-6">{adminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
}
