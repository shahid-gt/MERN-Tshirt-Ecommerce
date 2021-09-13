import React, { useState } from "react";
import Base from "../core/Base";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

export default function AddCategory() {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
  });

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const element = target.name;

    setValues({ ...values, [element]: value });
  };

  const backButton = () => {
    return (
      <>
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          <FontAwesomeIcon icon={faAngleDoubleLeft} /> Back
        </Link>
      </>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", success: false });

    //backend request fire from here .
    createCategory(user._id, token, { name: values.name }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", name: "", success: true });
      }
    });
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <h4 className="font-weight-bold">Enter the category name</h4>
          <input
            type="text"
            name="name"
            value={values.name}
            className="form-control"
            placeholder="Ex. Summer"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
          <button onClick={onSubmit} className="btn btn-outline-success mt-3">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: values.error ? "" : "none" }}
          >
            {values.error}
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success" style={{display : values.success ? "" : "none"}}>Category Created Successfully.</div>
      </div>
      </div>
    
    );
}

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-1 m-4">
          {errorMessage()}
          {successMessage()}
          {backButton()}
          {categoryForm()}
          <p className="text-dark text-center"> {JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
}
