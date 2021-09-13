import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/paymentHelper";

import DropIn from "braintree-web-drop-in-react";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

export default function Payment({
  CartProducts,
  reload = undefined,
  setReload,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    addressline: "",
    city: "",
    zip: "",
    state: "",
    
  });

  //here isAuthenticated() method sets the user profile .
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);

  //getmeToken is a helper class which returns the token from our server
  const getToken = (userId, token) => {
    getmeToken(userId, token).then((data) => {
      console.log("INFORMATION", data);
      if (data.error) {
        setInfo({ ...info, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const getAmount = () => {
    let amount = 0;
    CartProducts.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const handleChange = (event) => {
    document.getElementById("dropinui").style.display="none" ;
    const target = event.target;
    const element = target.name;
    const value = target.value;

    setInfo({ ...info, [element]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var Laddress = `${info.addressline} ${info.city} ${info.state} ${info.zip}`;
    console.log(Laddress);
    setInfo({ ...info, address: Laddress });
    document.getElementById("dropinui").style.display="block";
    console.log(info.address);
  };

  const addressUI = () => {
    return (
       (
        <form>
          <div
            className="row border rounded-3 align-items-center p-4 m-4 text-dark fw-bolder "
            style={{ backgroundColor: "#F7ECEF" }}
          >
            <div className="form-group m-2">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                name="addressline"
                className="form-control"
                onChange={(e) => {
                  handleChange(e);
                }}
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>

            <div className="form-row">
              <div className="form-group m-2 col-md-6">
                <label>City</label>
                <input
                  name="city"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  className="form-control"
                  id="inputCity"
                />
              </div>
              <div className="form-group col-md-4 m-2">
                <label htmlFor="inputState">State</label>
                <input
                  name="state"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-2 m-2">
                <label>Zip</label>
                <input
                  name="zip"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  className="form-control"
                  id="inputZip"
                />
              </div>
            </div>
            <button onClick={onSubmit} className="btn btn-success rounded btn-md m-2">
              Make payment
            </button>
          </div>
        </form>
      )
    );
  };

  const showDropInUI = () => {
    return (
      (
        <div id="dropinui" style={{display:"none"}}>
          {info.clientToken !== null && CartProducts.length > 0 ? (
            <div className="text-center">
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              />
              <button
                className="btn btn-lg btn-primary rounded"
                onClick={onPurchase}
                type="button"
              >
                Place order
              </button>
            </div>
          ) : (
            <h3 className="text-center"><span className="badge bg-danger">Please login or add something to cart.</span></h3>
          )}
        </div>
      )
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true});

    //now here we want to get nonce from braintree server for that
    let nonce;
    //so we are requesting braintree server for nonce
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      //also we required payment data for processPayment
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      //now after getting nonce successfully we can process the payment by providing payment amount as well as nonce .
      processPayment(userId, token, paymentData)
        .then((responce) => {
          setInfo({ ...info, success: responce.success, loading: false });
          console.log("PAYMENT SUCCESS");

          //after payment success we have to create the order
          const orderData = {
            products: CartProducts,
            transaction_id: responce.transaction.id,
            amount: parseInt(responce.transaction.amount),
            address: info.address,
          };
          console.log(orderData);
          createOrder(userId, token, orderData).then((data) => {
            if (data.error) {
              console.log(data);
              console.log("ERROR", data.error);
            } else {
              console.log("DATA", data);
            }
          });
          cartEmpty();

          //forcefull reload
          setReload(!reload) ;
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const successMessage = () => {
    return (
      info.success && (
        <h3 className="text-center text-align-center">
          <span className="badge bg-success ">Payment Successfull.Thank you for shopping</span>
        </h3>
      )
    );
  };

  return (
    <div>
      <h3 className="text-center">
        {" "}
        <span className="badge bg-success ">Your amount is ${getAmount()}</span>
      </h3>
      {successMessage()}
      {addressUI()}
      {showDropInUI()}
    </div>
  );
}
