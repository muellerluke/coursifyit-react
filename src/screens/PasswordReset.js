import React from "react";
import "./styles/PasswordReset.css";
import { putPassword } from "../api";


class PasswordReset extends React.Component {
    constructor() {
        super();
        this.state = {
          password: "",
          rePassword: ""
        };

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accountID = urlParams.get("id");
        const key = urlParams.get("key");
        if (this.state.password === this.state.rePassword && this.state.password.length >= 8) {
            putPassword(accountID, this.state.password).then((response) => {
                if (response) {
                    this.setState({alertText: "Password changed successfully!"});
                } else {
                    this.setState({alertText: "There was an error changing your password."});
                }
            })
        } else if (this.state.password !== this.state.rePassword) {
            this.setState({alertText: "Passwords do not match."});
        } else if (this.state.password.length < 8) {
            this.setState({alertText: "Passwords must be 8 characters or longer."})
        }
    }

    handleChange = (event) => {   
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
      } 

    render() {
        return (
            <div className="passwordReset-body">
                <div className="passwordReset-body-header">
                    <h1>Password Reset</h1>
                </div>
                <div className="passwordReset-body-body">
                    <input type="password" className="passwordReset-input" 
                    id="passwordReset-top-input" placeholder="Password"
                    onChange={this.handleChange} name="password"></input>
                    <input type="password" className="passwordReset-input" placeholder="Retype Password"
                    onChange={this.handleChange} name="rePassword"></input>
                </div>
                <div className="passwordReset-body-footer">
                    <button className="passwordReset-submit" onClick={this.submit}>Submit</button>
                    <h6>{this.state.alertText}</h6>
                </div>
            </div>
        )
    }
 }

 export default PasswordReset;