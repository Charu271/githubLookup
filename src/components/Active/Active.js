import React, { Component } from "react";
import axios from "axios";
import Particles from "react-particles-js";
import { particles } from "../../Assets/particlesjs-config";
import "./Active.scss";
import Fade from "react-reveal/Fade";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SunspotLoaderComponent from "../Trending/SunSpotLoader";
import "../Trending/Trending.scss";

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topUsers: [],
      init: 1,
      loader: true,
      total: [],
    };
  }
  getTopUsers = async () => {
    try {
      const res = await axios.get(
        "https://api.github.com/search/users?q=followers%3A%3E%3D1000",
        {
          headers: {
            Authorization: "Token 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",
          },
        }
      );

      var result = [];
      var data = res.data.items;

      for (var k = 0; k < data.length; k++) {
        axios
          .get(`https://api.github.com/users/${data[k].login}`, {
            headers: {
              Authorization: "Token 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",
            },
          })
          .then((res) => {
            result.push(res.data);
            if (result.length == 29) {
              result.sort(function (a, b) {
                return b.followers - a.followers;
              });
              const arr = [...result];
              result.length = 10;
              this.setState({
                topUsers: result,
                loader: false,
                total: arr,
                init: 2,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  componentDidMount() {
    this.getTopUsers();
  }
  load = () => {
    const arr = [...this.state.total];
    arr.length = this.state.init * 10;
    this.setState({ topUsers: arr, init: this.state.init + 1 });
  };
  render() {
    return (
      <div>
        <Particles className="particles2" params={particles} />

        <div className="users">
          {this.state.loader ? (
            <div className="sunspotLoader">
              <SunspotLoaderComponent />
            </div>
          ) : (
            <>
              <div className="row userWrapper">
                {this.state.topUsers.map((user, i) => {
                  if (i % 2 == 0) {
                    return (
                      <Fade left>
                        <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 topCard">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={user.avatar_url}
                                className="userImage"
                              />
                            </div>
                            <div className="col-9 userInformation">
                              <div>
                                {user.name}{" "}
                                <a
                                  target="_blank"
                                  href={user.html_url}
                                  className="userLogin"
                                >
                                  {user.login}
                                </a>
                              </div>

                              <div>
                                <PersonIcon style={{ fontSize: "22px" }} />
                                &nbsp;&nbsp;{user.followers}
                              </div>
                              <div>
                                {user.location != null ? (
                                  <LocationOnIcon
                                    style={{ fontSize: "22px" }}
                                  />
                                ) : null}
                                &nbsp;&nbsp;
                                {user.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    );
                  } else {
                    return (
                      <Fade right>
                        <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 topCard">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={user.avatar_url}
                                className="userImage"
                              />
                            </div>
                            <div className="col-9 userInformation">
                              <div>
                                {user.name}{" "}
                                <a
                                  target="_blank"
                                  href={user.html_url}
                                  className="userLogin"
                                >
                                  {user.login}
                                </a>
                              </div>

                              <div>
                                <PersonIcon style={{ fontSize: "22px" }} />
                                &nbsp;&nbsp;{user.followers}
                              </div>
                              <div>
                                {user.location != null ? (
                                  <LocationOnIcon
                                    style={{ fontSize: "22px" }}
                                  />
                                ) : null}
                                &nbsp;&nbsp;
                                {user.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    );
                  }
                })}
              </div>
              {this.state.init <= 3 ? (
                <button onClick={this.load} className="loadbtn">
                  Load more
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Active;
