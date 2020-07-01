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
    <tr key={customer.id}>
      <td>
        <Link to={`/customer/${customer.id}`}>{customer.attributes.name}</Link>
      </td>
      <td>{customer.attributes.address}</td>
      <td>{customer.attributes.city}</td>
      <td>{customer.attributes.state}</td>
      <td>{customer.attributes.dni_cif}</td>
      <td>{customer.attributes.telephone}</td>
    </tr>
  ));

  return (
    <div className="container-fluid">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">DNI/CIF</th>
            <th scope="col">Telephone</th>
          </tr>
        </thead>
        <tbody>{grid}</tbody>
      </table>
    </div>
  );
};

export default Customers;
