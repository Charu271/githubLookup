import React, { Component } from "react";
import "./Repo.scss";
import fork from "../../../Assets/fork.svg";
import StarIcon from "@material-ui/icons/Star";
import { colors } from "../../../Assets/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default class Repo extends Component {
  render() {
    const repo = this.props.repo;
    return (
      <div className="card">
        <div className="repoName">{repo.name}</div>
        {/* <div className="description">{repo.description}</div> */}
        <div className="content row ">
          <div className="language col-12">
            <FiberManualRecordIcon
              style={{
                color: `${colors[repo.language]}`,
              }}
            />
            &nbsp;
            {repo.language}
          </div>
          <div className="forks col-4">
            <div className="internal">
              <div>
                <img src={fork} style={{ fill: "black" }} />
              </div>
              <div>&nbsp;&nbsp;{repo.forks}</div>
            </div>
          </div>
          <div className="stars col-4">
            <div className="internal">
              <div>
                <StarIcon />
              </div>
              <div>&nbsp;&nbsp;{repo.stargazers_count}</div>
            </div>
          </div>
          <div className="size col-4">
            {repo.size > 1000
              ? `${Math.round(repo.size / 1000)} KB`
              : `${repo.size} B`}
          </div>
        </div>
      </div>
    );
  }
}
