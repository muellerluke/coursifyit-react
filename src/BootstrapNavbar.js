import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./BootstrapNavbar.css";
import navBarLogo from "./assets/Logo-for-Nav-Bar.png";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Review from "./screens/Review";
import About from "./screens/About";
import Account from "./screens/Account";
import Login from "./screens/Login";
import PasswordReset from "./screens/PasswordReset";
import Directions from "./screens/Directions";

class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountTabClass: "ml-auto",
      loggedIn: this.props.loggedIn,
      searchTokens: localStorage.getItem("searches"),
      displayDirections: true,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    this.logoutSuccess = this.logoutSuccess.bind(this);
    this.updateSearchTokens = this.updateSearchTokens.bind(this);
  }

  componentDidMount() {
    var width = window.innerWidth;
    if (width <= 991) this.setState({ accountTabClass: "nav-link" });
  }

  loginSuccess() {
    this.setState({loggedIn: true});
  }
  logoutSuccess() {
    this.setState({loggedIn: false});
  }
  updateSearchTokens() {
    this.setState({searchTokens: localStorage.getItem("searches")});
  }

  render() {
    return (
      <div>
        <div className="row" id="navBar-row">
          <div className="col-md-12" id="navBar-col">
            <Router>
              <Navbar variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/" className="mx-auto">
                  <img src={navBarLogo} id="navBarLogo" alt=""></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="container-fluid" id="nav-drop">
                    <Nav.Link
                      href="/search"
                      className={
                        document.URL.indexOf("/search") > 0
                          ? "active"
                          : "passive"
                      }
                      eventKey="/"
                    >
                      Search
                    </Nav.Link>
                    <Nav.Link
                      href="/review"
                      className={
                        document.URL.indexOf("/review") > 0
                          ? "active"
                          : "passive"
                      }
                      eventKey="/"
                    >
                      Review
                    </Nav.Link>
                    <Nav.Link
                      href="/about"
                      className={
                        document.URL.indexOf("/about") > 0
                          ? "active"
                          : "passive"
                      }
                      eventKey="/"
                    >
                      About
                    </Nav.Link>
                    <Nav.Link
                      className={this.state.accountTabClass}
                      href={this.state.loggedIn ? "/account" : "/login"}
                      id="account-link"
                    >
                      <div className="account-button">
                        <h1
                          className={
                            document.URL.indexOf("/account") > 0 ||
                            document.URL.indexOf("/login") > 0
                              ? "account-active"
                              : "account-passive"
                          }
                        >
                          {this.state.loggedIn ? String.fromCodePoint(0x1f50e) + this.state.searchTokens + " Account" : "Login / Register"}
                        </h1>
                      </div>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/search">
                  <Search updateSearchTokens={this.updateSearchTokens} loggedIn={this.state.loggedIn}/>
                </Route>
                <Route path="/review">
                  <Review loggedIn={this.state.loggedIn}/>
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/account">
                  <Account loggedIn={this.state.loggedIn} logoutSuccess={this.logoutSuccess} updateSearchTokens={this.updateSearchTokens}/>
                </Route>
                <Route path="/login">
                  <Login loginSuccess={this.loginSuccess}/>
                </Route>
                <Route path="/passwordreset">
                  <PasswordReset/>
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
        <Directions/>
      </div>
    );
  }
}

export default BootstrapNavbar;
