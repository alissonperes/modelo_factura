import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formatter from "../assets/currencyFormat";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [grid, setGrid] = useState([]);
  const [select, setSelect] = useState([]);
  const [card, setCard] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    const total = dashboard
      .filter(x => String(x.attributes.customer.name).includes(e.target.value))
      .map(y => y.attributes.total)
      .reduce((prev, next) => prev + next)
      .toFixed(2);

    setCard(
      <div className="card col-3 mb-4">
        <div className="card-header">Featured</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{formatter.format(total)}</li>
        </ul>
      </div>
    );

    setGrid(
      dashboard
        .filter(x =>
          String(x.attributes.customer.name).includes(e.target.value)
        )
        .map(invoice => {
          const dateClass =
            new Date() > new Date(invoice.attributes.due_date)
              ? "bg-warning"
              : "";
          return (
            <tr key={invoice.id} className={dateClass}>
              <td>
                <Link to={`/customer/${invoice.attributes.customer.id}`}>
                  {invoice.attributes.customer.name}
                </Link>
              </td>
              <td>
                <Link to={`/invoice/${invoice.id}`}>
                  {invoice.attributes.number}
                </Link>
              </td>
              <td>{invoice.attributes.date}</td>
              <td>{invoice.attributes.due_date}</td>
              <td>{invoice.attributes.payment_method}</td>
              <td>{formatter.format(invoice.attributes.sub_total)}</td>
              <td>
                {invoice.attributes.vat === true ? "21%" : "Sujeto Passivo"}
              </td>
              <td>{formatter.format(invoice.attributes.total)}</td>
            </tr>
          );
        })
    );
  };

  useEffect(() => {
    axios
      .get("/api/v1/dashboard")
      .then(result => setDashboard(result.data.data))
      .catch(result => console.log(result));

    setGrid(
      dashboard.map(invoice => {
        const dateClass =
          new Date() > new Date(invoice.attributes.due_date)
            ? "bg-warning"
            : "";
        return (
          <tr key={invoice.id} className={dateClass}>
            <td>
              <Link to={`/customer/${invoice.attributes.customer.id}`}>
                {invoice.attributes.customer.name}
              </Link>
            </td>
            <td>
              <Link to={`/invoice/${invoice.id}`}>
                {invoice.attributes.number}
              </Link>
            </td>
            <td>{invoice.attributes.date}</td>
            <td>{invoice.attributes.due_date}</td>
            <td>{invoice.attributes.payment_method}</td>
            <td>{formatter.format(invoice.attributes.sub_total)}</td>
            <td>
              {invoice.attributes.vat === true ? "21%" : "Sujeto Passivo"}
            </td>
            <td>{formatter.format(invoice.attributes.total)}</td>
          </tr>
        );
      })
    );

    let customers = dashboard.map(x => x.attributes.customer.name);
    let uniqueCustomers = customers.filter((c, index) => {
      return customers.indexOf(c) === index;
    });

    setSelect(
      <select
        className="form-control"
        onChange={handleChange}
        defaultValue="Customer"
      >
        <option value="">Customer</option>
        {uniqueCustomers.map(x => (
          <option key={x}>{x}</option>
        ))}
      </select>
    );

    if (dashboard.length > 0) {
      const total = dashboard
        .filter(x => String(x.attributes.customer.name))
        .map(y => y.attributes.total)
        .reduce((prev, next) => prev + next)
        .toFixed(2);

      setCard(
        <div className="card col-3 mb-4">
          <div className="card-header">Total</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{formatter.format(total)}</li>
          </ul>
        </div>
      );
    }
  }, [dashboard.length]);

  return (
    <div className="container-fluid">
      {card}
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">{select}</th>
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
