import React, { useState, useEffect } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  UncontrolledCollapse,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders, getProducts } from "./helper/adminapicall";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        <h3>{data.error}</h3>;
      } else {
        console.log(data);
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  

  const backButton = () => {
    return (
      <>
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          <FontAwesomeIcon icon={faAngleDoubleLeft} /> Back
        </Link>
      </>
    );
  };
  return (
    <div className="container-f align-items-center">
      <div className="bg-white  m-3 rounded-3 text-dark ">
        <div className="p-3 fw-bolder ">
          {backButton()}
          <h1 className=" pt-3 ">Orders</h1>
          <p className=" text-muted">{orders.length} Orders found</p>
          <div className="px-3">
            <div
              className="row border rounded-3 align-items-center p-2 my-2"
              style={{ backgroundColor: "#F7ECEF" }}
            >
              <div className="col-2">
                <span>Order Id</span>
              </div>
              <div className="col-2">
                <span>Name</span>
              </div>
              <div className="col-4">
                <span>Address</span>
              </div>
              <div className="col-1">
                <span>Date</span>
              </div>
              <div className="col-1">
                <span>Time</span>
              </div>
              <div className="col-1">
                <span>Price</span>
              </div>
              <div className="col-1">
                <span>Arrow</span>
              </div>
            </div>
            {orders.map((order, index) => {
              let tsplit = order.createdAt.split("T");
              let date = tsplit[0];
              let time = tsplit[1].split(".")[0];
              return (
                <div className="row border border-3 border-info rounded-3 align-items-center p-2 my-2 ">
                  <div className="col-2">
                    <h5>
                      <span className="badge bg-success me-4">{order._id}</span>
                    </h5>
                  </div>
                  <div className="col-1">
                    <span>{order.user.name}</span>
                  </div>
                  <div className="col-5">
                    <span>{order.address}</span>
                  </div>
                  <div className="col-1">
                    <span>{date}</span>
                  </div>
                  <div className="col-1">
                    <span>{time}</span>
                  </div>
                  <div className="col-1">
                    <span>{order.amount}</span>
                  </div>
                  <div className="col-1">
                    <Button color="primary" id={`C${order._id}`}>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                      />
                    </Button>
                  </div>
                  <UncontrolledCollapse toggler={`#C${order._id}`}>
                    <Card className="m-2 fw-bolder">
                      <CardBody className="text-center">
                        <h5 className="d-inline">
                          <span className="badge bg-success m-3">User ID</span>
                          {order.user._id}
                        </h5>
                        <h5 className="d-inline">
                          <span className="badge bg-success m-3">
                            Transaction ID
                          </span>
                          {order.transaction_id}
                        </h5>
                        <h5 className="d-inline">
                          <span className="badge bg-success m-3"> Email </span>
                          {order.user.email}
                        </h5>
                        <table className="table table-bordered border-success p-3 fw-normal">
                          <thead>
                            <tr>
                              <th scope="col">PRODUCT ID</th>
                              <th scope="col">NAME</th>
                              <th scope="col">PRICE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, index) => {
                              return (
                                <tr>
                                  <td>{product._id}</td>
                                  <td>{product.name}</td>
                                  <td>{product.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
