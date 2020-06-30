// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Customers from "../components/Customers";
import Customer from "../components/Customer";
import Dashboard from "../components/Dashboard";
import Invoices from "../components/Invoices";
import Header from "../components/Header";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Header />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/customer/:id" component={Customer} />
      <Route exact path="/invoices" component={Invoices} />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
