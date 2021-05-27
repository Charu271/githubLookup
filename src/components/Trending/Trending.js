import React, { Component } from "react";
import axios from "axios";
import "./Trending.scss";
import fork1 from "../../Assets/fork1.svg";
import StarIcon from "@material-ui/icons/Star";
import Particles from "react-particles-js";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { particles } from "../../Assets/particlesjs-config";
import { colors } from "../../Assets/colors";
import { languauges } from "../../Assets/languages.js";
import SunspotLoaderComponent from "./SunSpotLoader";
import Fade from "react-reveal/Fade";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: languauges,
      language: "javascript",
      starredRepos: [],
      total: [],
      loader: true,
      init: 1,
    };
  }
  setLanguauge = (e, value) => {
    this.setState({ language: value, loader: true }, () => {
      this.getTopRepositories();
    });
  };
  getTopRepositories = async () => {
    if (this.state.language != null) {
      try {
        const res = await axios.get(
          `https://api.github.com/search/repositories?q=language:${this.state.language}&sort=stars&order=desc`,
          {
            headers: {
              Authorization: "Token %Generate personal oAuth token%",
            },
          }
        );
        var arr = [...res.data.items];
        arr.length = 10;
        this.setState({
          starredRepos: arr,
          loader: false,
          total: res.data.items,
          init: 2,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  componentDidMount() {
    this.getTopRepositories();
  }
  load = () => {
    const arr = [...this.state.total];
    arr.length = this.state.init * 10;
    this.setState({ starredRepos: arr, init: this.state.init + 1 });
  };
  render() {
    return (
      <div>
        <Particles className="particles3" params={particles} />

        <div className="trending">
          <div className="row">
            <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <Autocomplete
                className="autocomplete"
                freeSolo
                id="free-solo-demo"
                options={this.state.languages}
                onChange={this.setLanguauge}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Language..."
                    margin="normal"
                    variant="standard"
                    className="textfield1"
                  />
                )}
              />
            </div>
          </div>
          {this.state.language === null ? (
            <div className="row">
              <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 text">
                Select any language
              </div>
            </div>
          ) : (
            <>
              {this.state.loader ? (
                <div className="sunspotLoader">
                  <SunspotLoaderComponent />
                </div>
              ) : (
                <>
                  <div className="row repoWrapper">
                    {this.state.starredRepos.length > 0
                      ? this.state.starredRepos.map((repo, i) => {
                          if (i % 2 === 0) {
                            return (
                              <Fade left key={i}>
                                <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 repositories">
                                  <div>
                                    <a
                                      href={repo.html_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="repositoryName"
                                    >
                                      {repo.name}
                                    </a>
                                  </div>
                                  <div className="repoInfo">
                                    <div
                                      className="badge languageBadge"
                                      style={{
                                        backgroundColor: colors[repo.language],
                                        color: "black",
                                      }}
                                    >
                                      {repo.language}
                                    </div>
                                    <div className="badge starBadge">
                                      <StarIcon style={{ fontSize: "20px" }} />
                                      &nbsp;&nbsp;
                                      {repo.stargazers_count}
                                    </div>
                                    <div className="badge forkBadge">
                                      <img src={fork1} alt="Fork" />
                                      &nbsp;&nbsp;
                                      {repo.forks_count}
                                    </div>
                                  </div>
                                  <div className="desc">{repo.description}</div>
                                </div>
                              </Fade>
                            );
                          } else {
                            return (
                              <Fade right key={i}>
                                <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 repositories">
                                  <div>
                                    <a
                                      href={repo.html_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="repositoryName"
                                    >
                                      {repo.name}
                                    </a>
                                  </div>
                                  <div className="repoInfo">
                                    <div
                                      className="badge languageBadge"
                                      style={{
                                        backgroundColor: colors[repo.language],
                                        color: "black",
                                      }}
                                    >
                                      {repo.language}
                                    </div>
                                    <div className="badge starBadge">
                                      <StarIcon style={{ fontSize: "20px" }} />
                                      &nbsp;&nbsp;
                                      {repo.stargazers_count}
                                    </div>
                                    <div className="badge forkBadge">
                                      <img src={fork1} alt="Fork" />
                                      &nbsp;&nbsp;
                                      {repo.forks_count}
                                    </div>
                                  </div>
                                  <div className="desc">{repo.description}</div>
                                </div>
                              </Fade>
                            );
                          }
                        })
                      : null}
                  </div>
                  {this.state.init <= 3 ? (
                    <button onClick={this.load} className="loadbtn">
                      Load more
                    </button>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Trending;
