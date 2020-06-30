import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

const Customers = props => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/customers")
      .then(result => setCustomers(result.data.data))
      .catch(result => console.log(result));
  }, [customers.length]);

  const grid = customers.map(customer => (
    <div key={customer.id}>
      <Link to={`/customer/${customer.id}`}>
        <p>{customer.attributes.name}</p>
      </Link>
      <p>{customer.attributes.address}</p>
      <p>{customer.attributes.city}</p>
      <p>{customer.attributes.state}</p>
      <p>{customer.attributes.dni_cif}</p>
      <p>{customer.attributes.telephone}</p>
      <hr />
    </div>
  ));

  return <div>{grid}</div>;
};

export default Customers;
