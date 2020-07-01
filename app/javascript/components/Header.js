import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar sticky-top mb-5 navbar-expand navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/invoices" className="nav-link">
            Invoices
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
