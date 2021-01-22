import React from "react";
import "./styles/Home.css";
import landingLogo from "../assets/Logo-for-landing-page.png";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     searchClicked: false,
     reviewClicked: false,
    };
    this.searchRedirect = this.searchRedirect.bind(this);
    this.reviewRedirect = this.reviewRedirect.bind(this);
  }

  searchRedirect = () => {
    if (this.state.searchClicked) {
      return (
        <Redirect to={{
          pathname: '/search',
      }} />
      )
    } 
  }
  reviewRedirect = () => {
    if (this.state.reviewClicked) {
      return (
        <Redirect to={{
          pathname: '/review',
      }} />
      )
    }
  }
  render() {
    return <div className="home-body">
      <img className="home-logo" src={landingLogo} alt="logo"/>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12" id="home-top-col">
          <button className="home-button" onClick={() => this.setState({searchClicked: true})}><h1 className="home-button-text">Read a Review</h1></button>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <button className="home-button" onClick={() => this.setState({reviewClicked: true})}><h1 className="home-button-text">Write a Review</h1></button>
        </div>
      </div>
      {this.searchRedirect()}
      {this.reviewRedirect()}
    </div>;
  }
}
export default Home;
