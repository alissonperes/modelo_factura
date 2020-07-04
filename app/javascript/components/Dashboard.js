import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formatter from "../assets/currencyFormat";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [grid, setGrid] = useState([]);
  const [customerFilter, setCustomerFilter] = useState([]);
  const [customerSelect, setCustomerSelect] = useState([]);
  const [card, setCard] = useState([]);
  const [newInvoice, setNewInvoice] = useState({});
  const [customers, setCustomers] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(newInvoice);
    e.currentTarget.reset();
  };

  const formChange = e => {
    let { name, value } = e.target;

    if (e.target.type === "number") {
      value = parseInt(value);
    }

    if (e.target.name === "customer") {
      console.log(e.target.selectedOptions[0].value);
    }

    setNewInvoice({ ...newInvoice, [name]: value });
  };

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

  useEffect(
    () => {
      axios
        .get("/api/v1/dashboard")
        .then(result => {
          setInvoiceNumber(result.data.last_number + 1);
          setDashboard(result.data.invoices.data);
          setNewInvoice({ number: invoiceNumber, payment_due: 90 });
        })
        .catch(result => console.log(result));

      axios
        .get("/api/v1/customers")
        .then(result => setCustomers(result.data.data))
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

      let invoiceCustomers = dashboard.map(x => x.attributes.customer.name);
      let uniqueCustomers = invoiceCustomers.filter((c, index) => {
        return invoiceCustomers.indexOf(c) === index;
      });

      setCustomerFilter(
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

      console.log(customers);
      setCustomerSelect(
        <select
          className="custom-select my-1 mr-sm-2"
          onChange={formChange}
          defaultValue=""
          name="customer_id"
          required
        >
          <option value=""></option>
          {customers.map(x => (
            <option key={x.id} value={x.id}>
              {x.attributes.name}
            </option>
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
    },
    [dashboard.length],
    customers.length
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              {customerSelect}
            </div>
            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                onChange={formChange}
                type="number"
                className="form-control"
                id="number"
                name="number"
                min="0"
                placeholder={invoiceNumber}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                onChange={formChange}
                type="date"
                className="form-control"
                id="date"
                name="date"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Payment Due</label>
              <input
                onChange={formChange}
                type="number"
                className="form-control"
                id="payment_due"
                name="payment_due"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Payment Method</label>
              <input
                onChange={formChange}
                type="text"
                className="form-control"
                id="payment_method"
                name="payment_method"
                placeholder="Payment method"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </form>
        </div>
        <div className="col-sm-9">
          {card}
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">{customerFilter}</th>
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
      </div>
    </div>
  );
};

export default Dashboard;
