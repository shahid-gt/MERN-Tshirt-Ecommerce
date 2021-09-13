import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getProducts } from "./helper/adminapicall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const {user,token} = isAuthenticated() ;

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        <h4>{data.error}</h4>;
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId,user._id,token).then((data)=>{
        preload();
    })
  }

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
    <Base title="Welcome admin" description="Manage products here">
        {backButton()}
      <h2 className="mb-4">All products:</h2>
      
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product) => {
            return (
              <div className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
