import React , {useState,useEffect} from 'react'
import "../styles.css" 
import {API} from "../backend" ;
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';
import { loadCart } from './helper/cartHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Payment from './Payment';

export default function Cart() {

    const [CartProducts, setCartProducts] = useState([])
    const [reload , setReload] = useState(false) ;

    useEffect(() => {
        setCartProducts(loadCart());
    }, [reload]);

    const [error, setError] = useState("")


    const leftViewCart = () => {
        return (
            <div className="col-6 d-flex justify-content-evenly text-dark flex-wrap" >
                {CartProducts.map((product,index)=>{
                    return (
                        <div  className="blocks"><Card key={index} product={product}  removefromcart={true}  setReload={setReload} reload={reload}/></div>
                    );
                })}
            </div>
        ) ;
    }

    const rightViewCheckout = () => {
        return (<div className="col-6 text-light"><Payment CartProducts={CartProducts} setReload={setReload}/></div>) ;
    }

    const backButton = () => {
        return (
          <>
            <Link className="btn btn-sm btn-success mb-3" to="/">
              <FontAwesomeIcon icon={faAngleDoubleLeft} /> Back
            </Link>
          </>
        );
      };

    return (
        <Base title="Cart Page" description="Manage your cart and Place Order">
            {backButton()}
            <div className="row d-flex justify-content-evenly text-dark flex-wrap">
               {leftViewCart()}
               {rightViewCheckout()}
            </div>
        </Base>
        
    );
}
