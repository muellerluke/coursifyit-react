import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapNavbar from "./BootstrapNavbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
    };
    this.loginSuccessParent = this.loginSuccessParent.bind(this);
  }

  loginSuccessParent() {
    console.log("loginSuccess - app");
    this.setState({loggedIn: true});
  }

  componentDidMount() {
    console.log(this.state.loggedIn);
    try {
      var token = localStorage.getItem("token");
      if (token) {
        console.log("token");
        this.setState({loggedIn: true});
      } else {
        console.log("no token");
        this.setState({loggedIn: false});
      }
    } catch {
      console.log("error");
      this.setState({loggedIn: false});
    }
  }
  componentDidUpdate() {
    console.log(this.state.loggedIn);
  }

  render() {
    return <BootstrapNavbar loginSuccessParent={this.loginSuccessParent} loggedIn={this.state.loggedIn}/>;
  }
  
}

export default App;
