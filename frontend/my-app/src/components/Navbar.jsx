import React, { useContext } from "react";
import "../assets/styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-left">
          <h1>Video Management Tool</h1>
        </div>
        <div className="navbar-right">
          <ul className="navbar-links">
            {user ? (
              <>
                <li className="navbar-item user-name">{user.displayName}</li>
                <li className="navbar-item">
                  <NavLink to="/dashboard" className="navbar-link">
                    Dashboard
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/upload" className="navbar-link">
                    Upload
                  </NavLink>
                </li>
                <li className="navbar-item" onClick={logout}>
                  Logout
                </li>
                <li className="navbar-item">
                  <img src={user.image} className="user-avatar" alt="Profile" />
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
