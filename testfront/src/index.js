import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import User from "./User";
import About from "./About";
import OrderMaster from "./OrderMaster" ;
import NotFound from "./NotFound";

const routing = () => {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/user">Visit User</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/user" component={User} />
        <Route path="/about" component={About} />
        <Route path="/orders" component={OrderMaster} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(routing(), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
