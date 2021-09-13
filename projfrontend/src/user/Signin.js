import React ,{useState} from 'react';
import Base from '../core/Base';
import { Link , Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper/index';

const Signin = () =>  {

    const [values,setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false ,
        didRedirect: false 
    });

    //destructuring things 
    const {email,password,error,loading,didRedirect} = values 
    const {user} = isAuthenticated() ;



    const handleChange = (event) => {
        const target = event.target ;
        const value = target.value ;
        const element = target.name ;

        setValues ({...values,[element]:value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then((data) => {
            if(data.error){
                setValues({...values,error:data.error,loading:false});
            }else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true})
                });
            }
        })
        .catch(console.log("signin request failed"));
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                       
                        <div className="form-group">
                            <label className="text-light m-2">Email</label>
                            <input name="email" onChange={(e)=>handleChange(e)} type="text"  className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light m-2">Password</label>
                            <input name="password" onChange={(e)=>handleChange(e)} type="text" className="form-control"/>
                        </div>
                        <div className="text-center p-2">                      
                          <button onClick={onSubmit} className="btn btn-success btn-md m-2">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user&&user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const errorMessagge = () => {
        return (
            <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>

        )
    }

    const loadingMessage = () => {
        return (
            loading && (<div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
        )
    }

    return (
        <Base title="Signin Page" description="using this page user will be signin">
            {signInForm()}
            {loadingMessage()}
            {errorMessagge()}
            {performRedirect()}
            <p className="text-center text-white">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin ;