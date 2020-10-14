import React from "react";
import "./styles/Login.css";
import { PropTypes } from 'react'
import { login } from "../api";
import logo from "../assets/LOGO_RGB_OUTLINED.png";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      rePassword: "",
      signUp: false,
      checked: false,
      usernameValid: true,
      passwordValid: true,
      loginAttempt: false,
      invalidCredentials: false,
    };

    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.renderRePassword = this.renderRePassword.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.rePasswordChanged = this.rePasswordChanged.bind(this);
  }

  usernameChanged(event) {
    var text = event.target.value.toLowerCase();
    if (text.indexOf(".edu") === text.length - 4 && text.length > 6) {
      this.setState({ usernameValid: true });
    } else {
      this.setState({ usernameValid: false });
    }
    this.setState({ username: text, loginAttempt: false });
  }

  passwordChanged(event) {
    if (event.target.value.length >= 8) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
    this.setState({ password: event.target.value, loginAttempt: false });
  }
  rePasswordChanged(event) {
    this.setState({rePassword: event.target.value, loginAttempt: false});
  }

  submitLogin() {
    login(this.state.username, this.state.password).then((response) => {
      if (response) {
        this.props.loginSuccess();
        this.setState({invalidCredentials: false});
        this.setState({loginAttempt: true});
      } else {
        this.setState({invalidCredentials: true});
        this.setState({loginAttempt: true});
      }
    });
  }

  toggleSignUp(event) {
    if (!this.state.signUp && event.target.innerHTML === "Sign Up") {
      this.setState({signUp: !this.state.signUp});
    } else if (this.state.signUp && event.target.innerHTML === "Login") {
      this.setState({signUp: !this.state.signUp});
    }
  }

  handleCheck() {
    this.setState({checked: !this.state.checked, loginAttempt: false});
  }
  

  renderRePassword() {
    if (this.state.signUp) {
      return (
        <div>
          <input className="password-input input" type="password" placeholder="Retype Password" value={this.state.rePassword} onChange={this.rePasswordChanged}></input>
          <div className="policy-div">
            <input className="policy checkbox" name="privacy-policy" id="privacy-policy" type="checkbox" defaultChecked={this.state.checked} onChange={this.handleCheck}/>
            <label className="policy" for="privacy-policy">I agree to the <a href="#">privacy policy</a></label>
          </div>
          
        </div>
      )
    } else {
      return (
        <button className="forgot-button"><span className="forgot-text">forgot my password</span></button>
      );
    }
  }
  renderAlert() {
    if (!this.state.loginAttempt) {
      return null
    } else {
      if (this.state.signUp) {
        if (!this.state.passwordValid) {
          return (
            <p>Password must be 8 characters or longer.</p>
          )
        } else if (this.state.password !== this.state.rePassword) {
          return (
            <p>Passwords do not match</p>
          )
        } else if (!this.state.usernameValid) {
          return (
            <p>You must use a student email address to register.</p>
          )
        } else if (!this.state.checked) {
          return (
            <p>You must agree to the privacy policy to register.</p>
          )
        } else {
          return null;
        }
      } else {
        if (this.state.invalidCredentials) {
          return (
            <p>Invalid login credentials.</p>
          )
        }
      }

    }
  }
  renderRedirect = () => {
    if (!this.state.invalidCredentials && this.state.loginAttempt) {
      return <Redirect to={{
        pathname: '/account',
    }} />
    }
  }
  
  render() {
    return (
      <div className="login">
        <div className="form">
          <div className="header">
            <img src={logo} alt="logo" id="login-logo"/>
            <div className="row">
              <div className="col">
                <button className={this.state.signUp ? "header-button" : "button-active"} onClick={this.toggleSignUp}
                disabled={!this.state.signUp ? true : false}>
                  <h5>Login</h5>
                </button>
              </div>
              <div className="col">
                <button onClick={this.toggleSignUp} className={!this.state.signUp ? "header-button" : "button-active"}
                disabled={this.state.signUp ? true : false}>
                  <h5>Sign Up</h5>
                </button>
              </div>
            </div>
          </div>
          <div className="body">
            <input
            type="username"
            name="username"
            className="username-input input"
            value={this.state.username}
            onChange={this.usernameChanged}
            placeholder="Student Email Address"
            />
            <input
            type="password"
            name="password"
            className="password-input input"
            value={this.state.password}
            onChange={this.passwordChanged}
            placeholder="Password"
            />
            {this.renderRePassword()}
            {this.renderAlert()}
            {this.renderRedirect()}
          </div>
          <div className="footer">
            <button onClick={this.submitLogin} className="header-button submit-button"><h5>Submit</h5></button>
          </div>
        </div>
      </div>
      
    );
  }
}


export default Login;
