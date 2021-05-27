import React, { Component } from "react";
import Profile from "./Profile/Profile";
import axios from "axios";
import Particles from "react-particles-js";
import "./User.scss";
import Pie from "./Charts/Pie";
import Column from "./Charts/Column";
import Area from "./Charts/Area";
import Repo from "./Repo/Repo";
import { colors } from "../../Assets/colors";
import { particles } from "../../Assets/particlesjs-config";
import SunspotLoaderComponent from "../Trending/SunSpotLoader";
import TimeLine from "../Timeline/Timeline";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      repos: [],
      pieData: [],
      starData: [],
      topRepos: [],
      pieColor: [],
      type: "stats",
      user: JSON.parse(localStorage.getItem("user")),
      loader: true,
      load: true,
    };
  }

  fetchTopRepos = (e) => {
    var result = [...this.state.repos];
    result.sort(function (a, b) {
      return b[e.target.value] - a[e.target.value];
    });
    if (result.length > 10) result.length = 10;
    this.setState({ topRepos: result });
  };
  animate() {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 4000);
  }
  componentDidMount() {
    this.animate();
    if (this.state.repos.length === 0) {
      axios
        .get(
          `https://api.github.com/users/${this.state.user.login}/repos?per_page=1000`,
          {
            headers: {
              Authorization: "Token %Generate personal oAuth token%",
            },
          }
        )
        .then((res) => {
          this.setState({ repos: res.data }, () => {
            var result = [...this.state.repos];
            result.sort(function (a, b) {
              return b["forks"] - a["forks"];
            });
            if (result.length > 10) result.length = 10;
            this.setState({ topRepos: result });
          });
          this.getWeeklyContributions();
          this.getTopLanguages();
          this.getStarred();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  getStarred = () => {
    const result = this.state.repos.map((repo, i) => {
      return {
        label: repo.name,
        y: repo.stargazers_count,
      };
    });
    result.sort(function (a, b) {
      return b.y - a.y;
    });
    if (result.length > 5) result.length = 5;
    this.setState({ starData: result });
  };
  getWeeklyContributions = () => {
    var commit = [];
    var n = this.state.repos.length - 1;
    for (var i = 0; i < 52; i++) commit.push(0);
    for (i = 0; i < this.state.repos.length; i++) {
      var last = i;
      axios
        .get(
          `https://api.github.com/repos/${this.state.user.login}/${this.state.repos[i].name}/stats/commit_activity`,
          {
            headers: {
              Authorization: "Token %Generate personal oAuth token%",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          var max = -9999999;
          for (var j = 0; j < data.length; j++) {
            commit[j] += data[j].total;
          }
          for (j = 0; j < commit.length; j++) {
            if (commit[j] > max) max = commit[j];
          }
          max = max + 20;
          if (n === last) {
            const result = commit.map((d, i) => {
              return { x: i + 1, y: (commit[i] / max) * 100 };
            });
            this.setState({
              data: result,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  getTopLanguages = () => {
    let map = new Map();
    this.state.repos.map(async (repo, index) => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${this.state.user.login}/${repo.name}/languages`,
          {
            headers: {
              Authorization: "Token %Generate personal oAuth token%",
            },
          }
        );
        var languages = Object.keys(res.data);
        for (var i = 0; i < languages.length; i++) {
          if (map.has(languages[i])) {
            map.set(languages[i], map.get(languages[i]) + 1);
          } else {
            map.set(languages[i], 1);
          }
          if (index === this.state.repos.length - 1) {
            let result = [];
            for (let [key, value] of map) {
              result.push({ key, value });
            }
            result.sort(function (a, b) {
              return b.value - a.value;
            });
            if (result.length > 5) result.length = 5;

            result = result.map((data, index) => {
              return {
                y: data.value,
                label: data.key,
                color: colors[data.key],
              };
            });
            const color = result.map((data) => {
              return colors[data.label];
            });
            this.setState({ pieData: result, pieColor: color });
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };
  setType = (val) => {
    this.setState({
      type: val,
    });
    // if (val == "stats") window.location.reload();
  };
  render() {
    return (
      <>
        <Particles className="particles1" params={particles} />
        <div className="outer-container">
          {this.state.loader &&
          this.state.data.length === 0 &&
          this.state.pieData.length === 0 &&
          this.state.starData.length === 0 ? (
            <div className="loaderWrap">
              <div className="sunspotLoader1">
                <SunspotLoaderComponent />
              </div>
            </div>
          ) : (
            <div className="userProfile row">
              <Profile userName={this.state.user} />
              <div className="row">
                <div className="selector col-11 offset-1 col-sm-5 offset-sm-7 col-md-4 offset-md-8">
                  <div className="row ">
                    <div
                      className="col-6 division1"
                      style={{
                        background:
                          this.state.type === "stats" ? "#728AF4" : "",
                        color: this.state.type === "stats" ? "black" : "white",
                      }}
                      onClick={() => this.setType("stats")}
                    >
                      Statistics
                    </div>
                    <div
                      className="col-6 division2"
                      style={{
                        background:
                          this.state.type === "timeline"
                            ? "#728AF4"
                            : "",
                        color:
                          this.state.type === "timeline" ? "black" : "white",
                      }}
                      onClick={() => this.setType("timeline")}
                    >
                      Timeline
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: this.state.type === "stats" ? "block" : "none",
                }}
              >
                <>
                  <div
                    className="col-12 parent"
                    style={{
                      display: this.state.type === "stats" ? "block" : "none",
                    }}
                  >
                    {this.state.data.length > 0 ? (
                      <Area data={this.state.data} className="area" />
                    ) : null}
                  </div>
                  <div className="col-12 parent">
                    {this.state.pieData.length > 0 ? (
                      <Pie pieData={this.state.pieData} />
                    ) : null}
                  </div>
                  <div className="col-12  parent">
                    {this.state.starData.length > 0 ? (
                      <Column starData={this.state.starData} />
                    ) : null}
                  </div>
                  <div className="topRepositories">
                    <div className="select row">
                      <div className="header">
                        <div>
                          Top repositories{" "}
                          <span className="by">by&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <select onChange={this.fetchTopRepos} className="form">
                          <option value="forks">Forks</option>
                          <option value="stargazers_count">Stars</option>
                          <option value="size">Size</option>
                        </select>
                      </div>
                      <div className="row wrapper">
                        {this.state.topRepos.map((repo, i) => (
                          <div className="col-12 col-sm-6 col-md-4 " key={i}>
                            <Repo repo={repo} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <div
                style={{
                  display: this.state.type == "timeline" ? "block" : "none",
                }}
              >
                <TimeLine />
              </div>
              {/* {this.state.type === "stats" ? (
               
              ) : (
                
              )} */}
            </div>
          )}
        </div>
      </>
    );
  }
}
export default User;
