import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formatter from "../assets/currencyFormat";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/invoices")
      .then(result => setInvoices(result.data.data))
      .catch(result => console.log(result));
    setGrid(
      invoices
        .filter(x => x.payment_confirmed !== true)
        .map(invoice => (
          <tr key={invoice.id}>
            <td>
              <Link to={`/invoice/${invoice.id}`}>
                {invoice.attributes.number}
              </Link>
            </td>
            <td>{invoice.attributes.date}</td>
            <td>{invoice.attributes.due_date}</td>
            <td>{invoice.attributes.payment_method}</td>
            <td>{formatter.format(invoice.attributes.sub_total)}</td>
            <td>{invoice.attributes.vat ? "21%" : "Sujeto Passivo"}</td>
            <td>{formatter.format(invoice.attributes.sub_total)}</td>
          </tr>
        ))
    );
  }, [invoices.length]);

  const handleChange = e => {
    e.preventDefault();
    setGrid(
      invoices
        .filter(x => String(x.attributes.number).includes(e.target.value))
        .map(invoice => (
          <tr key={invoice.id}>
            <td>
              <Link to={`/invoice/${invoice.id}`}>
                {invoice.attributes.number}
              </Link>
            </td>
            <td>{invoice.attributes.date}</td>
            <td>{invoice.attributes.due_date}</td>
            <td>{invoice.attributes.payment_method}</td>
            <td>{formatter.format(invoice.attributes.sub_total)}</td>
            <td>{invoice.attributes.vat ? "21%" : "Sujeto Passivo"}</td>
            <td>{formatter.format(invoice.attributes.total)}</td>
          </tr>
        ))
    );
  };

  return (
    <div className="container-fluid">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="text"
                className="form-control"
                placeholder="Number"
                onChange={handleChange}
              />
            </th>
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
