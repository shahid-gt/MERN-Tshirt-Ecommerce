import React,{useState,useEffect} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { addItemToCart, removeItemFromCart,addedToCartHelper } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

export default function Card({
  product,
  removefromcart = false,
  reload = undefined,
  
  setReload
}) {
  let history = useHistory();

  const [addtocart, setaddtocart] = useState(true);
  const [addedtocart, setaddedtocart] = useState(false);
  const [outofstock, setoutofstock] = useState(false)
  useEffect(() => {
  
    
    visibilityOfAddedToCartAndStock();
  

  }, [])

  const visibilityOfAddedToCartAndStock = () => {
    if(product.stock<=0){
      setaddtocart(false);
      setoutofstock(true) ;
    }
    else{
      if(addedToCartHelper(product._id)){
        setaddtocart(false);
        setaddedtocart(true);
      }
      if(removefromcart===true){
        setaddedtocart(false);
      }
    }
    
  }

  const onAddToCart = () => {
    addItemToCart(product, () => {
      history.push("/cart");
    });
  };

  const onRemoveFromCart = () => {
    removeItemFromCart(product._id);
    setReload(!reload);
  };

  const showOutOfStock = () => {
    return (
        outofstock && <div>
          <h5><span className="badge bg-danger">Out Of Stock</span></h5>
        </div>
    ) ;
  }

  //console.log(product);
  const showAddToCart = () => {
    return (
      addtocart && (
        <div className="col-12 mb-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="btn btn-outline-success rounded-3"
          >
            Add to cart
          </button>
        </div>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removefromcart && (
        <div className="col-12 mb-2">
          <button
            type="button"
            onClick={onRemoveFromCart}
            className="btn btn-outline-danger rounded-3"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  
  const showAddedToCart = () => {
    return (
      addedToCartHelper(product._id) && addedtocart && (
        <div className="col-12 mb-2">
          <h5><span className="badge bg-success">Added to cart</span></h5>
        </div>
      )
    )
  }

  return (
    <div
      className="card text-center border-5 border-dark rounded-3 shadow-lg"
      style={{ width: "18rem", height: "25rem" }}
    >
      <ImageHelper product={product} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <h2>
          <span className="badge bg-success">$ {product.price}</span>
        </h2>
        <div className="row">
          {showAddToCart()}
          {showRemoveFromCart()}
          {showAddedToCart()}
          {showOutOfStock()}
        </div>
      </div>
    </div>
  );
}
