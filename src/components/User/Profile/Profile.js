import React, { Component } from "react";
import "./Profile.scss";

class Profile extends Component {
  render() {
    const user = this.props.userName;
    return (
      <div className="container-fluid">
        <div className="row profile justify-content-center align-items-center">
          <div className="col-12 col-sm-12">
            <img className="avatar" src={`${user.avatar_url}`} />
          </div>
          <div className="col-12 col-sm-12">
            <div className="name">
              <h2>{user.name}</h2>
            </div>
          </div>
          <div className="col-12 login">
            <a target="_blank" href={user.html_url}>
              {user.login}
            </a>
          </div>
          <div className="col-12 repos">
            <div className="smCard">
              <div>{user.public_repos}</div>
              <div>Repositories</div>
            </div>
            <div className="smCard">
              <div>{user.followers}</div>
              <div>Followers</div>
            </div>
            <div className="smCard">
              <div>{user.following}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
