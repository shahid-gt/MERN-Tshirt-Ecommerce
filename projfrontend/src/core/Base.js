import React from 'react'
import Navigation from './Navigation';

const Base = ({title="HOME PAGE",description="world's best tshirts are available here",className="bg-dark text-white p-4",children}) => {
    return (
        <div>
            <Navigation/>
            <div className="container-fluid jumbotron text-center bg-success font-weight-italic">
                    <h2 className="display-4 ">{title}</h2>
                    <p className="lead ">{description}</p>
            </div>
            <div className={className}>{children}</div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-1">
                    <h5>if you have any question feel free to reach out</h5>
                    <button className="btn btn-warning ">Contact Us</button>
                </div>
            </footer>
        </div>
    );
}

export default Base ;
