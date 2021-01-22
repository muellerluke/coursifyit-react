import React from "react";
import "./styles/Directions.css";
import arrow from "../assets/arrow.png";
import x from "../assets/x.png";
import screenshot from "../assets/screenshot.jpg";

class Directions extends React.Component {
    constructor() {
        super();
        this.state = {
          directionsShown: false,
          directionsID: "",
          arrowID: "directions-arrow-up",
        };
        this.showDirections = this.showDirections.bind(this);
        this.deleteDirections = this.deleteDirections.bind(this);
    }

    componentDidMount() {
        var temp = localStorage.getItem("directionsClosed");
        if (temp) {
            var prevDate = new Date(temp).getTime();
            var currDate = new Date().getTime();
            var difference = (currDate - prevDate) / (1000 * 3600 * 24);
            if (difference < 1) {
                this.setState({directionsID: "directions-body-exit"});
            } else {
                this.setState({directionsID: ""});
            }
        }
    }

    showDirections() {
        if (!this.state.directionsShown) {
            this.setState({directionsShown: true, directionsID: "directions-body-shown", arrowID: ""});
        } else {

            this.setState({directionsShown: false, directionsID: "", arrowID: "directions-arrow-up"});
        }
    }

    deleteDirections() {
        var date = new Date();
        localStorage.setItem("directionsClosed", date);
        this.setState({directionsID: "directions-body-exit"});
    }

  render() {
    return (
    <div className="directions-body" id={this.state.directionsID}>
        <div className="row">
            <div className="col-3" id="arrow-col">
                <img className="directions-arrow" id={this.state.arrowID} src={arrow} alt="Open/Close" onClick={this.showDirections}/>
            </div>
            <div className="col-6">
                <h3 id="directions-title-text">Directions</h3>
            </div>
            <div className="col-3" id="x-col">
                <img id="directions-x" src={x} alt="X directions" onClick={this.deleteDirections}/>
            </div>
        </div>
        <div className="directions-text-body">
            <ul className="directions-list">   
                <li>
                    <h5 className="directions-text">
                    1. Login or create an account and receive three free search tokens.
                    </h5>
                </li>
                <li id="directions-list-first">
                    <div className="row" id="directions-row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h5 className="directions-text">
                            2. Search tokens can be used to reveal detailed ratings of courses and are shown in the navigation bar next to the "Account" tab.
                            </h5>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12" id="directions-col-screenshot">
                            <img id="directions-screenshot" src={screenshot} alt="screenshot"></img>
                        </div>
                    </div>
                </li>
                <li>
                    <h5 className="directions-text">
                    3. Reviewing courses will reward you with more search tokens.
                    </h5>
                </li>
                <li>
                    <h5 className="directions-text">
                    4. Use the search tokens to find the easiest courses with the easiest teachers.
                    </h5>
                </li>
            </ul>
        </div>
    </div>);
  }
}
export default Directions;