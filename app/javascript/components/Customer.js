import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Customer = props => {
  const customerId = props.match.params.id;
  const [customer, setCustomer] = useState([]);
  const [invoices, setInvoices] = useState([]);
  let customerContainer;
  const setCustomerContainer = c => {
    customerContainer = <div>{c.name}</div>;
  };

  useEffect(() => {
    axios.get(`/api/v1/customers/${customerId}`).then(result =>
      setCustomer(
        <div className="customer">
          <p>{result.data.data.attributes.name}</p>
          <p>{result.data.data.attributes.address}</p>
          <p>{result.data.data.attributes.city}</p>
          <p>{result.data.data.attributes.state}</p>
          <p>{result.data.data.attributes.dni_cif}</p>
          <p>{result.data.data.attributes.telephone}</p>
        </div>
      )
    );

    axios.get(`/api/v1/customers/${customerId}/invoices`).then(result => {
      setInvoices(
        result.data.data.map(invoice => (
          <tr key={invoice.id}>
            <td>
              <Link to={`/invoice/${invoice.id}`}>
                {invoice.attributes.number}
              </Link>
            </td>
            <td>{invoice.attributes.date}</td>
            <td>{invoice.attributes.payment_due}</td>
            <td>{invoice.attributes.payment_method}</td>
            <td>{invoice.attributes.vat}</td>
            <td>{invoice.attributes.sub_total}</td>
            <td>{invoice.attributes.total}</td>
          </tr>
        ))
      );
      console.log(result.data.data);
    });
  }, [customer.length]);

  return (
    <div>
      {customer}
      <table>
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Date</th>
            <th scope="col">Payment due</th>
            <th scope="col">Payment Method</th>
            <th scope="col">VAT</th>
            <th scope="col">Sub total</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{invoices}</tbody>
      </table>
    </div>
  );
};

export default Customer;
