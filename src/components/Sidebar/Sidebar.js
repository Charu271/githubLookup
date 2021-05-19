import React, { Component } from "react";
import "./Sidebar.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TimelineIcon from "@material-ui/icons/Timeline";
import GroupIcon from "@material-ui/icons/Group";
import CodeIcon from "@material-ui/icons/Code";

class Sidebar extends Component {
  render() {
    return (
      <div class="d-flex flex-column flex-shrink-0 bg-light sidebar">
        <a
          href="/"
          class="d-block p-3 link-dark text-decoration-none"
          title=""
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
        >
          <span class="visually-hidden">Icon-only</span>
        </a>
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link active py-3 border-bottom"
              aria-current="page"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Home"
            >
              <AccountCircleIcon />
              <br />
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              class="nav-link py-3 border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <TimelineIcon />
              <br />
              Timeline
            </a>
          </li>
          <li>
            <a
              href="#"
              class="nav-link py-3 border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Orders"
            >
              <GroupIcon />
              <br /> Most active users
            </a>
          </li>
          <li>
            <a
              href="#"
              class="nav-link py-3 border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Products"
            >
              <CodeIcon />
              <br /> Top Repositories
            </a>
          </li>
          <li>
            <a
              href="#"
              class="nav-link py-3 border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Customers"
            >
              {/* <svg class="bi" width="24" height="24">
                <use xlink:href="#people-circle"></use>
              </svg> */}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
