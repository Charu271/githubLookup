//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
//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
import React, { Component } from "react";
import Profile from "./Profile/Profile";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Particles from "react-particles-js";
import "./User.scss";
import Pie from "./Charts/Pie";
import Column from "./Charts/Column";
import Area from "./Charts/Area";
import Repo from "./Repo/Repo";
import { colors } from "../../Assets/colors";
import { particles } from "../../Assets/particlesjs-config";
import ScatterBoxLoaderComponent from "./Loader";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      repos: [],
      pieData: [],
      starData: [],
      topRepos: [],
      topUsers: [],
      pieColor: [],
      languages: ["C", "Java", "Javascript"],
      language: "javascript",
      starredRepos: [],
      user: JSON.parse(localStorage.getItem("user")),
      loader: true,
    };
  }
  getTopRepositories = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=language:${this.state.language}&sort=stars&order=desc`,
        {
          headers: {
            Authorization: "Token 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",
          },
        }
      );
      this.setState({ starredRepos: res.data.items });
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  setLanguauge = (e, value) => {
    console.log(value);
    this.setState({ language: value });
  };
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
        this.getTopUsers();
        this.getWeeklyContributions();
        this.getTopLanguages();
        this.getStarred();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getTopUsers = async () => {
    try {
      const res = await axios.get(
        "https://api.github.com/search/users?q=followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users",
        {
          headers: {
            Authorization: "Token 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",
          },
        }
      );
      this.setState({ topUsers: res.data.items });
      //console.log(res.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };
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
              <div className="col-12 parent">
                {this.state.data.length > 0 ? (
                  <Area data={this.state.data} className="area" />
                ) : null}
              </div>
              <div className="row twoCharts justify-content-center align-items-center">
                <div class="col-12 col-md-6 parent">
                  {this.state.pieData.length > 0 ? (
                    <Pie
                      pieData={this.state.pieData}
                      pieColor={this.state.pieColor}
                    />
                  ) : null}
                </div>
                <div class="col-12 col-md-6 parent">
                  {this.state.starData.length > 0 ? (
                    <Column starData={this.state.starData} />
                  ) : null}
                </div>
              </div>
              <div className="topRepositories">
                <div className="select row">
                  <div className="h ">
                    Top repositories
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
                <br />
                <br />

                {/* {this.state.topUsers.map((user) => (
          <p>{user.login}</p>
        ))} */}
                {/* <select>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="php">PHP</option>
          <option value="c++">C++</option>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="r">R</option>
          <option value="c#">C#</option>
          <option value="typescript">Typescript</option>
          <option value="shell">Shell</option>
          <option value="swift">Swift</option>
          <option value="dart">Dart</option>
          <option value="kotlin">Kotlin</option>
          <option value="go">Go</option>
        </select>*/}
                {/* <button onClick={this.getTopRepositories}>Get Top Repositories</button>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={this.state.languages}
          onChange={this.setLanguauge}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        {this.state.starredRepos.length > 0
          ? this.state.starredRepos.map((repo) => <p>{repo.name}</p>)
          : null} */}
              </div>
              //{" "}
              {/* <div className="col-4 col-sm-3 col-md-2">
          <Sidebar />
        </div> */}
              {/* <div className="col-8 col-sm-9 col-md-10"> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default User;
