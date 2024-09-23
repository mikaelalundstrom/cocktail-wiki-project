import React from "react";
import { Link } from "react-router-dom";
import "./css/NotFoundPage.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Page not found </h1>
      <p className="not-found-text"> Would you like to go back to the homepage?</p>
      <Link className="not-found-link" to="/">
        To Homepage
      </Link>
    </div>
  );
};

export default NotFound;
