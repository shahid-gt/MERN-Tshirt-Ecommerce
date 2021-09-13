import { API } from "../../backend";

//categories api's is here .
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = (catId) => {
  return fetch(`${API}/category/${catId}`,{
      method:"GET"
  }).then(response=>{
      return response.json();
  }).catch(err => console.log(err));
}

export const updateCategory = (catId,userId,token,category) =>{
  return fetch(`${API}/category/${catId}/${userId}`,{
    method:"PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(category)
  }).then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));

}

export const deleteCategory = (catId,userId,token) =>{
  return fetch(`${API}/category/${catId}/${userId}`,{
    method:"DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}
//products api's call from below

//create product
export const createProduct = (userId, token, formData) => {
 
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      "Accept" : "application/json",
      "type" : "formData" ,
      Authorization: `Bearer ${token}`,
    },
    //here we are accepting a form data so in that case we don't need to convert it 
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all products 
export const getProducts = () => {
    return fetch(`${API}/products`,{
        method : "GET"
    }).then(response => {return response.json()}).catch((err)=>console.log(err));
}

//get a product by product id 
export const getProduct = (productId) => {
    return fetch(`${API}/product/getProduct/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json();
    }).catch(err => console.log(err));
}

//update a product 
export const updateProduct = (productId,userId, token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      //here we are accepting a form data so in that case we don't need to convert it 
      body: product,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

//delete a product 
export const deleteProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

//fetch all orders from backend 
export const getAllOrders = (userId,token) => {
    return fetch(`${API}/order/all/${userId}`,{
      method:"GET" ,
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((response)=>{
      return response.json() ;
    }).catch((err)=>console.log(err));
}