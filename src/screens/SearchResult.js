import React from "react";
import "./styles/SearchResult.css";

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
        revealDetails: false,
        review: {},
        unlocked: false,
    };
    this.renderDetails = this.renderDetails.bind(this);
  }
  componentDidMount() {
      this.setState({unlocked: this.props.unlocked});
      var temp = {};
      if (!this.props.unlocked) {
          Object.keys(this.props.review).forEach((key) => {
              if (key !== "reviews" && key !== "WouldTake" && key !== "Teacher") {
                temp[key] = "?";
              } else {
                  temp[key] = this.props.review[key];
              }
          })
          this.setState({review: temp});
      } else {
        this.setState({review: this.props.review});
      }
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.unlocked === true && this.state.unlocked === false) {
            this.setState({review: nextProps.review, unlocked: true});
        }
      }
    renderDetails() {
        if (this.state.revealDetails) {
            return (
                <div className="private-div">
                    <h5>Hover over criteria to view more information.</h5>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h6 className="review-label"><span className="tool">1 = teacher plays Candy crush all of class<br></br>10 = I'mlearning without even trying</span>
                            Teacherness: <span className="span-data">{this.state.review.Teacherness}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = no homework<br></br>10 = no free time</span>
                            Homework Amount: <span className="span-data">{this.state.review.HomeworkAmount}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = no need to study<br></br>10 = no need to have a life</span>
                            Quiz Difficulty: <span className="span-data">{this.state.review.QuizDiff}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = what's a test?<br></br>10 = gonna fail no matter what</span>
                            Test Difficulty: <span className="span-data">{this.state.review.TestDiff}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">yes = ability to bloons tower defense all of class<br></br>no ="Please close your computers" every class</span>
                            Multitasking Allowed: <span className="span-data  span-data-yes">{this.state.review.Multitasking}% Yes</span>
                            <span className="span-data span-data-no">{this.state.unlocked ? 100 - this.state.review.Multitasking : "?"}% No</span></h6>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h6 className="review-label"><span className="tool">1 = easiest class i've ever taken<br></br>10 = no life besides the class</span>
                            Overall Difficulty: <span className="span-data">{this.state.review.OverallDiff}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = mindless work<br></br>10 = This isn't even worth my time</span>
                            Homework Difficulty: <span className="span-data">{this.state.review.HomeworkDiff}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = straight out of a horror movie<br></br>10 = We're hanging out next week</span>
                            Teacher Likeness: <span className="span-data">{this.state.review.TeacherLikeness}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">1 = the exam didn't exist<br></br>10 = went into the exam with an a and finished with an f</span>
                            Exam Difficulty: <span className="span-data">{this.state.review.ExamDiff}</span>/10</h6>
                            <h6 className="review-label"><span className="tool">yes = attendence is a portion of your grade<br></br>no = attendence is not a portion of your grade</span>
                            Mandatory Attendence: <span className="span-data span-data-yes">{this.state.review.MandatoryAttendence}% Yes</span>
                            <span className="span-data span-data-no">{this.state.unlocked ? 100 - this.state.review.MandatoryAttendence : "?"}% No</span></h6>
                        </div>
                    </div>
                </div>
            )
        }
    }

  render() {
      return (
          <div className="search-result-body">
              <div className="row" id="search-result-public">
                  <div className="col-lg-4 col-md-4 col-sm-12" onClick={() => this.setState({revealDetails: !this.state.revealDetails})}>
                    <h5 className="search-result-public-text">Teacher: {this.props.review.Teacher}</h5>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12" onClick={() => this.setState({revealDetails: !this.state.revealDetails})}>
                     <h5 className="search-result-public-text">Would Take: {this.props.review.WouldTake * 100}%</h5>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12" onClick={() => this.setState({revealDetails: !this.state.revealDetails})}>
                    <h5 className="search-result-public-text">Reviews: {this.props.review.reviews}</h5>
                  </div>
                  {this.renderDetails()}
              </div>  
          </div>
      )
  }
}

export default SearchResult;