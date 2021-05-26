import React, { Component } from "react";
import "./Navbar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../DarkMode";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-expand-sm fixed-top ">
          <Link className="navbar-brand" to="/">
            <GitHubIcon style={{ fontSize: "2.5rem" }} />
          </Link>

          <div className="d-flex flex-row order-xs-2 order-sm-3 order-md-3 order-lg-3 b">
            <ul className="navbar-nav flex-row">
              <li>
                <DarkMode />
              </li>
            </ul>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MenuIcon style={{ color: "#9497a3" }} />
            </button>
          </div>
          <div
            className="collapse navbar-collapse order-xs-3 order-sm-2 order-md-2 order-lg-2  "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-4 mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/topUsers"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#728AF4",
                  }}
                >
                  Most Active Users
                </NavLink>
              </li>
              <li className="nav-item last">
                <NavLink
                  className="nav-link"
                  to="/topRepos"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#728AF4",
                  }}
                >
                  Top repositories
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
