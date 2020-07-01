import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Invoice = props => {
  const invoiceId = props.match.params.id;
  const [customer, setCustomer] = useState([]);
  const [items, setItems] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    axios.get(`/api/v1/invoices/${invoiceId}`).then(result => {
      const { attributes } = result.data.data;
      const { items } = attributes;
      setInvoiceData(attributes);
      setCustomer(attributes.customer);
      setItems(items);
    });
  }, [customer.length]);

  const itemsTable = items.map(item => (
    <tr key={item.id}>
      <td>{item.description}</td>
      <td>{item.quantity}</td>
      <td>{item.unit}</td>
      <td>{item.price}</td>
      <td>{item.total}</td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <h4>{invoiceData.number}</h4>
          <h5>{invoiceData.date}</h5>
        </div>
        <div className="col-7">
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.city}</p>
          <p>{customer.state}</p>
          <p>{customer.dni_cif}</p>
          <p>{customer.telephone}</p>
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{itemsTable}</tbody>
      </table>
      <div className="row">
        <div className="col">
          <h5>SubTotal</h5>
          <p>{invoiceData.sub_total}</p>
        </div>
        <div className="col">
          <h5>VAT</h5>
          <p>{invoiceData.vat ? "21%" : "Sujeto Passivo"}</p>
        </div>
        <div className="col">
          <h5>Total</h5>
          <p>{invoiceData.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
