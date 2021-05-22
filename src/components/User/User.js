//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
//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
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
import ScatterBoxLoaderComponent from "./Loader";
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
    };
  }

  fetchTopRepos = (e) => {
    //console.log(this.state.repos);
    var result = [...this.state.repos];
    result.sort(function (a, b) {
      return b[e.target.value] - a[e.target.value];
    });
    //console.log(e.target.value);
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
    axios
      .get(
        `https://api.github.com/users/${this.state.user.login}/repos?per_page=1000`,
        {
          headers: {
            Authorization: "Token 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",
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        this.setState({ repos: res.data }, () => {
          var result = [...this.state.repos];
          result.sort(function (a, b) {
            return b["forks"] - a["forks"];
          });
          if (result.length > 10) result.length = 10;
          this.setState({ topRepos: result });
        });
        //this.getTopUsers();
        this.getWeeklyContributions();
        this.getTopLanguages();
        this.getStarred();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getStarred = () => {
    const color = ["#bb86fc", "#ee7a8b", "#f9c270", "#64cce8"];
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
    for (var i = 0; i < this.state.repos.length; i++) {
      var last = i;
      axios
        .get(
          `https://api.github.com/repos/${this.state.user.login}/${this.state.repos[i].name}/stats/commit_activity`,
          {
            headers: {
              Authorization: "Token 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",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          var max = -9999999;
          for (var j = 0; j < data.length; j++) {
            commit[j] += data[j].total;
          }
          for (var j = 0; j < commit.length; j++) {
            if (commit[j] > max) max = commit[j];
          }
          max = max + 20;
          //console.log(commit);
          //console.log(n, last);
          if (n == last) {
            const result = commit.map((d, i) => {
              return { x: i + 1, y: (commit[i] / max) * 100 };
            });
            this.setState({
              data: result,
            });
          }
        })
        .catch((err) => {
          console.log(err);
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
              Authorization: "Token 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",
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
          if (index == this.state.repos.length - 1) {
            let result = [];
            for (let [key, value] of map) {
              result.push({ key, value });
            }
            result.sort(function (a, b) {
              return b.value - a.value;
            });
            if (result.length > 5) result.length = 5;
            console.log(result);

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
            console.log(result);
            console.log(color);
            this.setState({ pieData: result, pieColor: color });
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };
  setType = (val) => {
    this.setState({ type: val });
  };
  render() {
    return (
      <div className="outer-container">
        {this.state.loader &&
        this.state.data.length == 0 &&
        this.state.pieData.length == 0 &&
        this.state.starData.length == 0 ? (
          <ScatterBoxLoaderComponent />
        ) : (
          <div>
            <Particles className="particles1" params={particles} />
            <div className="userProfile row">
              <Profile userName={this.state.user} />
              <div className="row">
                <div className="selector col-6 offset-6 col-sm-4 offset-8">
                  <div className="row">
                    <div
                      className="col-6"
                      style={{
                        backgroundColor:
                          this.state.type == "stats" ? "#25bfb6" : "#15182c",
                        color: this.state.type == "stats" ? "black" : "white",
                      }}
                      onClick={() => this.setType("stats")}
                    >
                      Statistics
                    </div>
                    <div
                      className="col-6"
                      style={{
                        backgroundColor:
                          this.state.type == "timeline" ? "#25bfb6" : "#15182c",
                        color:
                          this.state.type == "timeline" ? "black" : "white",
                      }}
                      onClick={() => this.setType("timeline")}
                    >
                      Timeline
                    </div>
                  </div>
                </div>
              </div>
              {this.state.type == "stats" ? (
                <>
                  <div className="col-12 parent">
                    {this.state.data.length > 0 ? (
                      <Area data={this.state.data} className="area" />
                    ) : null}
                  </div>
                  <div class="col-12 parent">
                    {this.state.pieData.length > 0 ? (
                      <Pie
                        pieData={this.state.pieData}
                        pieColor={this.state.pieColor}
                      />
                    ) : null}
                  </div>
                  <div class="col-12  parent">
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
                        <select
                          onChange={this.fetchTopRepos}
                          className="form-select"
                        >
                          <option value="forks">Forks</option>
                          <option value="stargazers_count">Stars</option>
                          <option value="size">Size</option>
                        </select>
                      </div>
                      <div className="row wrapper">
                        {this.state.topRepos.map((repo) => (
                          <div className="col-12 col-sm-6 col-md-4 ">
                            <Repo repo={repo} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <TimeLine />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default User;
