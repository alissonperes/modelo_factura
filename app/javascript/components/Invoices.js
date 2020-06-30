import React, { useState, useEffect } from "react";
import axios from "axios";

const Invoices = () => {
  const [invoices, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/invoices")
      .then(result => setCustomers(result.data.data))
      .catch(result => console.log(result));
  }, [invoices.length]);
  const grid = invoices.map(invoice => (
    <tr key={invoice.id}>
      <td>{invoice.attributes.number}</td>
      <td>{invoice.attributes.date}</td>
      <td>{invoice.attributes.payment_due}</td>
      <td>{invoice.attributes.payment_method}</td>
      <td>{invoice.attributes.vat}</td>
      <td>{invoice.attributes.sub_total}</td>
      <td>{invoice.attributes.total}</td>
    </tr>
  ));

  return (
    <div>
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
        <tbody>{grid}</tbody>
      </table>
    </div>
  );
};

export default Invoices;
