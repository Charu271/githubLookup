import React, { Component } from "react";
<<<<<<< Updated upstream
=======
import "./Navbar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../DarkMode"


>>>>>>> Stashed changes

class Navbar extends Component {

  render() {
    return (
      <div>
<<<<<<< Updated upstream
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Github LookUp
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Link
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    class="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
=======
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
              <li>
              <DarkMode/>
              </li>
            </ul>
>>>>>>> Stashed changes
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
