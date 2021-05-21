import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "react";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Navbar from "./components/Navbar/Navbar";


const history = createBrowserHistory();
console.log(history);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: null };
    this.setUserName = this.setUserName.bind(this);
    this.linkRef = React.createRef();
  }
  setUserName(userName) {
    this.setState({ userName: userName }, () => {
      this.linkRef.current.click();
    });
  }
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <Home setUserName={this.setUserName} />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
        <Link to="/user" ref={this.linkRef} style={{ display: "none" }}>
          link1
        </Link>
      </div>
    );
  }
}

export default App;
