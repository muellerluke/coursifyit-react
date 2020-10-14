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

class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountTabClass: "ml-auto",
      loggedIn: this.props.loggedIn,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  componentDidMount() {
    var width = window.innerWidth;
    if (width <= 991) this.setState({ accountTabClass: "nav-link" });
  }

  loginSuccess() {
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <div>
        <div className="row" id="navBar-row">
          <div className="col-md-12" id="navBar-col">
            <Router>
              <Navbar variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/" className="mx-auto">
                  <img src={navBarLogo} alt=""></img>
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
                          {this.state.loggedIn ? String.fromCodePoint(0x1f50e) + localStorage.getItem("searches") + " Account" : "Login / Register"}
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
                  <Search />
                </Route>
                <Route path="/review">
                  <Review />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/account">
                  <Account loggedIn={this.state.loggedIn}/>
                </Route>
                <Route path="/login">
                  <Login loginSuccess={this.loginSuccess}/>
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapNavbar;
