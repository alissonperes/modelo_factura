import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formatter from "../assets/currencyFormat";

const Customer = props => {
  const customerId = props.match.params.id;
  const [customer, setCustomer] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/customers/${customerId}`).then(result => {
      const { attributes } = result.data.data;
      const { invoices } = attributes;

      setCustomer(
        <div className="customer">
          <p>{attributes.name}</p>
          <p>{attributes.address}</p>
          <p>{attributes.city}</p>
          <p>{attributes.state}</p>
          <p>{attributes.dni_cif}</p>
          <p>{attributes.telephone}</p>
        </div>
      );

      setInvoices(
        invoices
          .filter(x => x.payment_confirmed !== true)
          .map(invoice => {
            const dateClass =
              new Date() > new Date(invoice.due_date) ? "bg-warning" : "";

            return (
              <tr key={invoice.id} className={dateClass}>
                <td>
                  <Link to={`/invoice/${invoice.id}`}>{invoice.number}</Link>
                </td>
                <td>{invoice.date}</td>
                <td>{invoice.due_date}</td>
                <td>{invoice.payment_method}</td>
                <td>{formatter.format(invoice.sub_total)}</td>
                <td>{invoice.vat ? "21%" : "Sujeto Passivo"}</td>
                <td>{formatter.format(invoice.total)}</td>
              </tr>
            );
          })
      );
    });
  }, [customer.length]);

  return (
    <div className="container">
      {customer}
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Date</th>
            <th scope="col">Payment due</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Sub total</th>
            <th scope="col">VAT</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{invoices}</tbody>
      </table>
    </div>
  );
};

export default Customer;
