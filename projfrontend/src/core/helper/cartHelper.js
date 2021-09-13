export const addItemToCart = (item,next) => {
    let cart = [] ;
    if(typeof(window)!==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({...item})
    }
    
    localStorage.setItem("cart",JSON.stringify(cart))
    next() ;
}

export const addedToCartHelper = (productId)  => {
    let cart =[] ;
    let temp = false;
    if(typeof(window) !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,index)=>{
            if(product._id===productId){
                temp = true;
            }
        })
        return temp;
    }
}

export const removeItemFromCart = (productId) => {
    let cart = [] ;
    if(typeof(window) !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,index)=>{
            if(product._id === productId) {
                cart.splice(index,1) ;
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    
}

export const loadCart = () => {
    if(typeof(window)!==undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
        
    }
}

export const cartEmpty = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      //here we are setting up the empty cart value . 
      let cart = [] ;
      localStorage.setItem("cart",JSON.stringify(cart));
      
    }
  };
  