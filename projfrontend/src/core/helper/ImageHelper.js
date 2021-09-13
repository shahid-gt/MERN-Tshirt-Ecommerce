import React from 'react'
import { API } from '../../backend';


export default function ImageHelper({product}) {
    let imageUrl = product ? `${API}/product/photo/${product._id}`:`https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80`;
    return (
        <div>
            <img
        className="card-img-top"
        src={imageUrl}
        alt="Card image cap"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
        </div>
    );
}
