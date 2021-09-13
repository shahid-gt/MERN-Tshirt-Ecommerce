import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom" ;
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import Orders from './admin/Orders';


export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/cart" component={Cart} />
            <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard}/>
            <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
            <AdminRoute exact path="/admin/create/category" component={AddCategory} />
            <AdminRoute exact path="/admin/categories" component={ManageCategories} />
            <AdminRoute exact path="/admin/create/product" component={AddProduct} />
            <AdminRoute exact path="/admin/products" component={ManageProducts} />
            <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
            <AdminRoute exact path="/admin/update/:categoryId" component={UpdateCategory} />
            <AdminRoute exact path="/admin/orders" component={Orders}/>

        </Switch>
      </BrowserRouter>  
    );
}
