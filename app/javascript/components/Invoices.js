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
  const grid = invoices
    .filter(x => x.payment_confirmed !== true)
    .map(invoice => (
      <tr key={invoice.id}>
        <td>
          <Link to={`/invoice/${invoice.id}`}>{invoice.attributes.number}</Link>
        </td>
        <td>{invoice.attributes.date}</td>
        <td>{`${invoice.attributes.payment_due} => ${invoice.attributes.due_date}`}</td>
        <td>{invoice.attributes.payment_method}</td>
        <td>{invoice.attributes.sub_total}</td>
        <td>{invoice.attributes.vat ? "21%" : "Sujeto Passivo"}</td>
        <td>{invoice.attributes.total}</td>
      </tr>
    ));

  return (
    <div className="container-fluid">
      <form>
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Number" />
          </div>
          <div className="col">
            <input type="date" className="form-control" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Payment Method"
            />
          </div>
          <div className="col">
            <label>VAT</label>
            <input type="checkbox" className="form-control" />
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
            <th scope="col">Sub total</th>
            <th scope="col">VAT</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{grid}</tbody>
      </table>
    </div>
  );
};

export default Invoices;
