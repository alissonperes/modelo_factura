import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/invoices")
      .then(result => setInvoices(result.data.data))
      .catch(result => console.log(result));
  }, [invoices.length]);
  const grid = invoices.map(invoice => (
    <tr key={invoice.id}>
      <td>
        <Link to={`/invoice/${invoice.id}`}>{invoice.attributes.number}</Link>
      </td>
      <td>{invoice.attributes.date}</td>
      <td>{`${invoice.attributes.payment_due} => ${invoice.attributes.due_date}`}</td>
      <td>{invoice.attributes.payment_method}</td>
      <td>{invoice.attributes.vat}</td>
      <td>{invoice.attributes.sub_total}</td>
      <td>{invoice.attributes.total}</td>
    </tr>
  ));

  return (
    <div className="container-fluid">
      <form>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Number" />
          </div>
          <div class="col">
            <input type="date" class="form-control" />
          </div>
        </div>
      </form>
      <table className="table table-hover table-bordered">
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
