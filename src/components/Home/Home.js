import React, { Component } from "react";
import Particles from "react-particles-js";
import { particles } from "../../Assets/particlesjs-config";
import octocat from "../../Assets/octocat.png";
import "./Home.scss";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      user: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({ userName: e.target.value });
  }
  search = async (e) => {
    if (e.key == "Enter") {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${this.state.userName}`
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        this.props.setUserName(res.data);
      } catch (e) {
        console.log(e);
        alert("Invalid userName");
      }
    }
  };
  render() {
    return (
      <>
        <Particles className="particles" params={particles} />
        <div class="heading">
          <h1>Github LookUp</h1>
        </div>
        <div class="container-fluid heroSection ">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-2 col-lg-3"></div>
            <div className="col-12 col-md-8 col-lg-6 ">
              <div classNameName="hero">
                <img src={octocat} className="octocat" />
                <br />
                <input
                  className="form-control"
                  placeholder="Your Github id"
                  type="text"
                  className="textfield"
                  value={this.state.userName}
                  onChange={(e) => this.changeHandler(e)}
                  onKeyPress={(e) => this.search(e)}
                />
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-3"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
