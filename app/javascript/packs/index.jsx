// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import Customers from "../components/Customers";
import Customer from "../components/Customer";
import Invoices from "../components/Invoices";
import Invoice from "../components/Invoice";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Header />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/customer/:id" component={Customer} />
      <Route exact path="/invoices" component={Invoices} />
      <Route exact path="/invoice/:id" component={Invoice} />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
