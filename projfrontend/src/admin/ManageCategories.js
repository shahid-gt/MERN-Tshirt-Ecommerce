import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const {user,token} = isAuthenticated() ;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
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

  const deleteThisCategory = (categoryId) => {
        deleteCategory(categoryId,user._id,token).then((data)=>{
            preload();
        })
  }

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      {backButton()}
      <h2 className="mb-4">All Categories:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
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
