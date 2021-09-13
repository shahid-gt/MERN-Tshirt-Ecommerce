import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect , useHistory} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createProduct, getCategories } from "./helper/adminapicall";


export default function AddProduct() {

  let history = useHistory() ;


  const [values, setValues] = useState({
    name: "",
    photo: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    //
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  //let's destructuring
  const {
    name,
    photo,
    category,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    const target = event.target;
    const element = target.name;
    let Tempvalue;
    if (element === "photo") {
      Tempvalue = target.files[0];
    } else {
      Tempvalue = target.value;
    }

    formData.set(element, Tempvalue);
    setValues({ ...values, [element]: Tempvalue });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          stock: "",
          getRedirect: true,
          loading: false,
          createdProduct: data.name,
        });
      }
    });
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
          <div
            className="alert alert-success"
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} created successfully
          </div>
        </div>
      </div>
    );
  };

  function performRedirect() {
    if (getRedirect) {
      setTimeout(function(){history.push("/admin/dashboard")}, 2000);
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
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

  const preload = () => {
    //fetching all the categories from db.
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const createProductForm = () => (
    <form>
      <span className="m-2">Post photo</span>
      <div className="form-group m-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group m-2">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group m-2">
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group m-2">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group m-2">
        <select
          onChange={(e) => {
            handleChange(e);
          }}
          className="form-control"
          placeholder="Category"
          name="category"
        >
          <option value="">Select Category</option>
          {categories &&
            categories.map((cate, index) => {
              return <option value={cate._id}>{cate.name}</option>;
            })}
        </select>
      </div>
      <div className="form-group m-2">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="number"
          className="form-control"
          placeholder="Stock"
          name="stock"
          value={stock}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success m-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add product here!"
      description="welcome to product cration section"
      className="bg-success p-4 container mb-4"
    >
      <div className="row bg-white rounded m-4">
        <div className="col-8 offset-2 rounded p-4">
          {backButton()}
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
          {loadingMessage()}
          {performRedirect()}
          <p className="text-center text-dark">{JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
}
