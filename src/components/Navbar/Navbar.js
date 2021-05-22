import React, { Component } from "react";
import "./Navbar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-default navbar-expand-sm fixed-top ">
          {/* <div class="container-fluid"> */}
          <Link class="navbar-brand" to="/">
            <GitHubIcon style={{ fontSize: "2.5rem" }} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MenuIcon style={{ color: "#9497a3" }} />
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-4 mb-2 mb-lg-0 ms-auto">
              <li class="nav-item">
                <NavLink
                  className="nav-link "
                  to="/topUsers"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#25bfb6",
                  }}
                >
                  Most Active Users
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  className="nav-link"
                  to="/topRepos"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#25bfb6",
                  }}
                >
                  Top repositories
                </NavLink>
              </li>
            </ul>
          </div>
          {/* </div> */}
        </nav>
      </div>
    );
  }
}

export default Navbar;
