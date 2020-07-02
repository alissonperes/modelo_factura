import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/dashboard")
      .then(result => setDashboard(result.data.data))
      .catch(result => console.log(result));
  }, [dashboard.length]);
  const grid = dashboard
    .filter(x => x.payment_confirmed !== true)
    .map(invoice => (
      <tr key={invoice.id}>
        <td>
          <Link to={`/customer/${invoice.attributes.customer.id}`}>
            {invoice.attributes.customer.name}
          </Link>
        </td>
        <td>
          <Link to={`/invoice/${invoice.id}`}>{invoice.attributes.number}</Link>
        </td>
        <td>{invoice.attributes.date}</td>
        <td>{`${invoice.attributes.payment_due} => ${invoice.attributes.due_date}`}</td>
        <td>{invoice.attributes.payment_method}</td>
        <td>{invoice.attributes.sub_total}</td>
        <td>{invoice.attributes.vat === true ? "21%" : "Sujeto Passivo"}</td>
        <td>{invoice.attributes.total}</td>
      </tr>
    ));

  return (
    <div className="container-fluid">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Customer</th>
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

export default Dashboard;
