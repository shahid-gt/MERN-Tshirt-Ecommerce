import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderMaster() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      
    setIsOpen(!isOpen);
  };

  const rotate = isOpen ? "rotate(180deg)" : "rotate(0)" ;
  return (
    <div className="container-f">
      <div
        className="bg-white m-3 rounded-3 text-dark "
        style={{ height: "600px" }}
      >
        <div className="p-3 fw-bolder ">
          <h1 className=" pt-3 ">Order</h1>
          <p className=" text-muted">29 Order found</p>
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
            <div className="row border rounded-3 align-items-center p-2 my-2 ">
              <div className="col-2">
              <h5><span className="badge bg-success me-4">{order._id} </span></h5>
              </div>
              <div className="col-2">
                <span>{order.pro}</span>
              </div>
              <div className="col-4">
                <span>jdkljJ JFLDKJ JFLKJ FLKDJ</span>
              </div>
              <div className="col-1">
                <span>2021-09-07</span>
              </div>
              <div className="col-1">
                <span>07:28:12</span>
              </div>
              <div className="col-1">
                <span>90</span>
              </div>
              <div className="col-1">
                <Button color="primary" onClick={toggle}>
                  <FontAwesomeIcon style={{transform:rotate,transition:"all 0.25s ease-in-out"}}  icon={faChevronDown} />
                </Button>
              </div>
              <Collapse isOpen={isOpen}>
                <Card className="m-2 fw-bolder">
                  <CardBody className="text-center">
                  <h5 className="d-inline"><span className="badge bg-success m-3"> User ID </span>611cb76cb3f6be49b80c713e</h5>
                  <h5 className="d-inline"><span className="badge bg-success m-3"> Transaction ID </span>9acrzr1z</h5>
                  <h5 className="d-inline"><span className="badge bg-success m-3"> Email </span>shahidshaikh9286@gmail.com</h5>
                  <table className="table table-bordered border-success p-3 fw-light">
                      <thead>
                          <tr>
                              <th scope="col">PRODUCT ID</th>
                              <th scope="col">NAME</th>
                              <th scope="col">PRICE</th>
                          </tr>
                      </thead>
                      <tbody>
                           <tr>
                               <td>611cb76cb3f6be49b80c713e</td>
                               <td>Nike groom</td>
                               <td>90</td>
                           </tr>
                      </tbody>
                  </table>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(orders)}</p>
    </div>
  );
}
