import React from "react";
import DOMPurify from "dompurify";
import aboutFile from "../assets/about.txt";
import "./styles/About.css";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      html: ""
    };
  }

  componentDidMount() {
    fetch(aboutFile).then(r => r.text()).then(text => {
      text = DOMPurify.sanitize(text);
      this.setState({html: text}); 
    })
  }

  render() {
    return <div>
      <h1>hi</h1>
      <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
    </div>;
  }
}
export default About;
