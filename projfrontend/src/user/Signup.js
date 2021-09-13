import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {signup} from "../auth/helper/index"

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //destructure
  const { name, email, password, error, success } = values;

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const element = target.name;

    setValues({...values , [element]: value });

  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:false})
    //core part
    signup({name,email,password})
    .then(data=>{
        if(data.err){
            setValues({...values,error:data.err,success:false})
        }
        else{
            setValues({
                ...values,
                name:"",
                email:"",
                password :"",
                error:"",
                success:true
            })
        }
    })
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light m-2">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light m-2">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light m-2">Password</label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-control"
              />
            </div>
            <div className="text-center p-2">
              <button onClick={onSubmit} className="btn btn-success btn-md m-2">Signup</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
      return (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{display : success ? "" : "none"}}>new account is created successfully please <Link to="/signin">login here.</Link></div>
        </div>
        </div>
      
      );
  }

  const errorMessage = () => {
      return (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error}</div>
        </div></div>
      );
  }

  return (
    <Base title="Signup Page" description="using this page user will be signup">
      {errorMessage()}
      {successMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
