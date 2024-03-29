import React from "react";
import "./styles/Account.css";
import AccountReview from "./AccountReview";
import {getReviews, logOut, sendVerification, resetPassword, deleteAccount, getAccount} from "../api";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerHeight: "auto",
      data: [],
      reviewsLoaded: false,
      username: "",
      logOutState: false,
      alertText: "",
      verified: true,
      redirectPage: false,
    };
    this.renderReviews = this.renderReviews.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.logOutClick = this.logOutClick.bind(this);
    this.checkReviews = this.checkReviews.bind(this);
    this.sendVerificationClick = this.sendVerificationClick.bind(this);
    this.resetPasswordClick = this.resetPasswordClick.bind(this);
    this.deleteAccountClick = this.deleteAccountClick.bind(this);
  }
  componentDidMount() {
    getAccount().then((result) => {
      if (result === "error") {
        this.setState({redirectPage: true});
      } else {
        this.setState({verified: result});
      this.props.updateSearchTokens();
      this.setState({username: localStorage.getItem("username")})
      if (window.innerWidth <= 768) {
        if (this.state.verified) {
          this.setState({footerHeight: "122px"});
        } else {
          this.setState({footerHeight: "177px"});
        }
      } else {
        if (this.state.verified) {
          this.setState({footerHeight: "66px"});
        }
      }
      }
      
    })
  }
  checkReviews() {
    if (this.state.username !== "" && this.state.reviewsLoaded === false) {
      getReviews().then((response) => {
        this.setState({ data: response });
        this.setState({reviewsLoaded: true});
      })
    }
  }


  renderReviews() {
    if (this.state.reviewsLoaded === true && localStorage.getItem("username") !== "" && this.state.data.length > 0) {
      return (
        this.state.data.map((item, i) => <AccountReview review={item} key={i}></AccountReview>)
      )
    } else {
      return (
        <li className="account-review-none">
          <h5>You have no reviews</h5>
        </li>
      );
    }
  }
  logOutClick() {
    logOut().then(() => {
      this.setState({logOutState: true});
    })
  }
  deleteAccountClick() {
    if (window.confirm("Are you sure you want to delete your account?"))
    deleteAccount().then(() => {
      this.setState({logOutState: true});
    })
  }

  renderRedirect = () => {
    if (this.state.logOutState) {
      this.props.logoutSuccess();
      return <Redirect to={{
        pathname: '/',
    }} />
    } else if (this.state.redirectPage) {
      logOut();
      this.props.logoutSuccess();
        return <Redirect to={{
          pathname: '/login'
        }} />
    }
  }
  sendVerificationClick() {
    sendVerification().then((response) => {
      if (response) {
        this.setState({alertText: "Verification email sent!"});
      } else {
        this.setState({alertText: "Error sending verification email."});
      }
    })
  }
  resetPasswordClick() {
    resetPassword().then((response) => {
      if (response) {
        this.setState({alertText: "A link to reset your password has been sent to your email address."});
      } else {
        this.setState({alertText: "Error sending password reset email."});
      }
    })
  }
  renderAlert() {
    if (this.state.alertText !== "") {
      return (<div className="account-header-alert">
        <h6>{this.state.alertText}</h6>
      </div>)
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <div className="account-body">
        <div className="account-body-header">
          <div className="account-body-header-header">
            <h1>Account</h1>
          </div>
          <div className="account-body-header-body">
            <h5>Email: {localStorage.getItem("username")}</h5>
            <h5>Verified: {this.state.verified ? "Yes" : "No"}</h5>
          </div>
          <div className="account-body-header-footer" style={{height: this.state.footerHeight}}>
            <button className="account-body-header-footer-button" id="logout-button" onClick={this.logOutClick}>Log Out</button>
            <button className={this.state.verified ? "no-display" : "account-body-header-footer-button"}
            onClick={this.sendVerificationClick}>Send Verification Email</button>
            <button className="account-body-header-footer-button" id="reset-button"
            onClick={this.resetPasswordClick}>Reset Password</button>
          </div>
          {this.renderAlert()}
        </div>
        <div className="account-body-reviews">
          <div className="account-body-reviews-header">
            <h1>Your Reviews</h1>
          </div>
          {this.renderReviews()}
        </div>
        <button className="account-body-delete" onClick={this.deleteAccountClick}>Delete Account</button>
        {this.checkReviews()}
        {this.renderRedirect()}
      </div>;
    } else {
      return <Redirect to={{
        pathname: '/login'
      }} />
    }
    
  }
}
export default Account;
