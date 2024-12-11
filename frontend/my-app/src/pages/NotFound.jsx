import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h2>404 - Page Not Found</h2>
      <p>
        The page you are looking for doesn't exist. Go back to the{" "}
        <Link to="/" className="notfound-link">
          Dashboard
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
