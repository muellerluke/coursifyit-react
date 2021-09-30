import React from "react";
import "./styles/Review.css";
import { requestSchools, requestCourses, requestTeachers, postReview, } from "../api";

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      school: "",
      schools: [],
      courseCode: "",
      courseCodes: [],
      teacherName: "",
      teacherNames: [],
      results: 0,
      Teacherness: "",
      HomeworkAmount: "",
      QuizDiff: "",
      TestDiff: "",
      Multitasking: "",
      MultitaskingChanged: false,
      WouldTake: "",
      WouldTakeChanged: false,
      OverallDiff: "",
      HomeworkDiff: "",
      TeacherLikeness: "",
      ExamDiff: "",
      MandatoryAttendence: "",
      MandatoryAttendenceChanged: false,
      attemptedSubmit: false,
      reviewObj: {},
      criteriaList: [],
      successfulPost: false,
      didSubmit: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.schoolChange = this.schoolChange.bind(this);
    this.getSchools = this.getSchools.bind(this);
    this.courseCodeChange = this.courseCodeChange.bind(this);
    this.teacherNameChange = this.teacherNameChange.bind(this);
    this.renderErrorText = this.renderErrorText.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleInputChange(e) {
    if (e.target.value < 11) {
      var temp = this.state.criteriaList;
      if (!temp.includes(e.target.name)) {
        temp.push(e.target.name);
      }
      this.setState({
        [e.target.name]: e.target.value, criteriaList: temp
      })
    }
  }
  handleButtonChange(e, boo) {
    var temp = this.state.criteriaList;
    if (!temp.includes(e.target.name)) {
      temp.push(e.target.name);
    }
    this.setState({
      [e.target.name]: boo, criteriaList: temp
    });
    if (!this.state.MultitaskingChanged && e.target.name === "Multitasking") {
      this.setState({
        MultitaskingChanged: true
      });
    }
    else if (!this.state.MandatoryAttendenceChanged && e.target.name === "MandatoryAttendence") {
      this.setState({
        MandatoryAttendenceChanged: true
      });
    }
    else if (!this.state.WouldTakeChanged && e.target.name === "WouldTake") {
      this.setState({
        WouldTakeChanged: true
      });
    }
  }
  schoolChange(e) {
    this.setState({school: e.target.value.toUpperCase()});
    this.getSchools();
  }
  getSchools() {
    if (this.state.results > 5 || this.state.results === 0) {
      requestSchools(this.state.school).then((json) => {
        var data = json.data;
        if (data) {
          var tempArr = [];
          if (data.length < 5) {
            for (var i = 0; i < data.length; i++) {
              tempArr.push(data[i].School);
            }
            this.setState({schools: tempArr});
          } else {
            this.setState({results: data.length});
          } 
        }
      });
    }
  }
  courseCodeChange(e) {
    var text = e.target.value.toUpperCase();
    text = text.replace(/\s/g, '');
    text = text.replace(/\W/g, '');
    this.setState({courseCode: text.toUpperCase()});
    var tempArr = [];
    var tempSchoolArr = [];
    for (var i = 0; i < this.state.schools.length; i++) {
      tempSchoolArr.push(this.state.schools[i].toUpperCase());
    }
    if (tempSchoolArr.includes(this.state.school)) {
      requestCourses(this.state.school).then((json) => {
        if (json.data.length > 0) {
          var data = json.data[0].Classes;
        data.forEach((elem) => {
          if (elem.Code.indexOf(text) >= 0 && tempArr.length <= 5) {
            tempArr.push(elem);
          }
        })
        if (tempArr !== this.state.courseCodes) {
          this.setState({courseCodes: tempArr});
        }
        }
      })
    }
  }
  teacherNameChange(e) {
    var text = e.target.value.toUpperCase();
    this.setState({teacherName: text, teacherNames: []});
    requestTeachers(this.state.school, this.state.courseCode).then((json) => {
      if (json) {
        var data = json.data[0];
      var teacherNamesLocal = [];
        data.Classes.forEach(function (c) {
          c.Teachers.forEach(function (t) {
            teacherNamesLocal.push(t.Name);
          });
        });
      this.setState({teacherNames: teacherNamesLocal});
      }
    })
  }
  renderSchools() {
    if (this.state.schools.length > 0) {
      return (
        this.state.schools.map((elem, i) => 
          <option key={i}>{elem}</option>
        )
      )
    }
  }
  renderCourseCodes() {
    if (this.state.courseCodes.length > 0) {
      return (
        this.state.courseCodes.map((elem, i) => 
          <option key={i}>{elem.Code}</option>
        )
      )
    }
  }
  renderTeacherNames() {
    if (this.state.teacherNames.length > 0) {
      return (
        this.state.teacherNames.map((elem, i) => 
        <option key={i}>{elem}</option>
        )
      )
    }
  }
  renderErrorText() {
    if (this.state.attemptedSubmit) {
      var tempSchoolArr = [];
      for (var i = 0; i < this.state.schools.length; i++) {
        tempSchoolArr.push(this.state.schools[i].toUpperCase());
      }
      if (this.state.criteriaList.length < 11) {
        return (
          <h6>Please fill in all of the criteria.</h6>
        )
      } else if (Object.keys(this.state.reviewObj).length !== 12) {
        return (
          <h6>Ratings must be between 1 and 10.</h6>
        )
      } else  if (!tempSchoolArr.includes(this.state.school)) {
        return (
          <h6>Doesn't look like that school exists.</h6>
        )
      } else if (this.state.courseCode === "") {
        return (
          <h6>Please provide a course code.</h6>
        )
      } else if (this.state.teacherName === "") {
        return (
          <h6>Please provide the teacher's last name.</h6>
        )
      } else if (this.state.successfulPost && this.state.didSubmit) {
        return (
          <h6>Review Submitted!</h6>
        )
      } else if (!this.state.successfulPost && this.state.didSubmit) {
        return (
          <h6>Looks like you already submitted a review for this course.</h6>
        )
      }
    } 
  }
  submit() {
    var localObj = {};
    for(var i = 0; i < this.state.criteriaList.length; i++) {
      if ((this.state[this.state.criteriaList[i]] > 0 && this.state[this.state.criteriaList[i]] < 11) || (this.state.criteriaList[i] === "WouldTake") || (this.state.criteriaList[i] === "Multitasking") || (this.state.criteriaList[i] === "MandatoryAttendence")) {
        localObj[this.state.criteriaList[i]] = parseInt(this.state[this.state.criteriaList[i]]);
      } 
    }
    var tempSchoolArr = [];
      for (var j = 0; j < this.state.schools.length; j++) {
        tempSchoolArr.push(this.state.schools[j].toUpperCase());
      }
    this.setState({reviewObj: localObj, attemptedSubmit: true});
    if (this.state.criteriaList.length === 11 && Object.keys(localObj).length === 11 && this.props.loggedIn && tempSchoolArr.includes(this.state.school)
    && this.state.courseCode !== "" && this.state.teacherName !== "") {
      postReview(this.state.school, this.state.courseCode, this.state.teacherName, localObj).then((response) => {
        if (response) {
          this.setState({successfulPost: true, didSubmit: true});
        } else {
          this.setState({successfulPost: false, didSubmit: true});
        }
      })
      
      setTimeout(() => window.location.reload(), 3000);
    }
  }

  render() {
    return (
      <div className="review">
        <div className="review-header">
          <h1 className="review-header-text">Review</h1>
        </div>
        <div className="review-options">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12" id="review-school-input">
              <input className="review-options-input" value={this.state.school} onChange={this.schoolChange} placeholder="School" autoComplete="off" list="schoolList"></input>
              <datalist id="schoolList">
                {this.renderSchools()}
              </datalist>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12" id="review-course-input">
              <input className="review-options-input" value={this.state.courseCode} onChange={this.courseCodeChange} placeholder="Course Code(I.E. COM101)" autoComplete="off" list="courseCodeList"></input>
              <datalist id="courseCodeList">
                {this.renderCourseCodes()}
              </datalist>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <input className="review-options-input" value={this.state.teacherName} onChange={this.teacherNameChange} placeholder="Teacher's Last Name" autoComplete="off" list="teacherNameList"></input>
              <datalist id="teacherNameList">
                {this.renderTeacherNames()}
              </datalist>
            </div>
          </div>
        </div>
        <div className="review-body">
          <h5 className="review-body-details">{this.props.loggedIn ? "Hover over or click on criteria to view more details" : "You must be logged in to submit a review"}</h5>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = teacher plays Candy crush all of class<br></br>10 = I'm learning without even trying</span>
                Teacherness:</h6><input type="number" className="review-element-input" value={this.state.Teacherness} onChange={this.handleInputChange} name="Teacherness"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = no homework<br></br>10 = no free time</span>
                Homework Amount:</h6><input type="number" className="review-element-input" value={this.state.HomeworkAmount} onChange={this.handleInputChange} name="HomeworkAmount"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = no need to study<br></br>10 = no need to have a life</span>
                Quiz Difficulty:</h6><input type="number" className="review-element-input" value={this.state.QuizDiff} onChange={this.handleInputChange} name="QuizDiff"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = what's a test?<br></br>10 = gonna fail no matter what</span>
                Test Difficulty:</h6><input type="number" className="review-element-input" value={this.state.TestDiff} onChange={this.handleInputChange} name="TestDiff"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">yes = ability to bloons tower defense all of class<br></br>no =
                  "Please close your computers" every class</span>
                Multitasking Allowed:</h6>
                <button name="Multitasking" onClick={(e) => this.handleButtonChange(e, 1)} className={(this.state.Multitasking && this.state.MultitaskingChanged ? "review-button-active" : "review-button-passive")}>Yes</button>
                <button name="Multitasking" onClick={(e) => this.handleButtonChange(e, 0)} className={(!this.state.Multitasking && this.state.MultitaskingChanged ? "review-button-active" : "review-button-passive")}>No</button>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text">
                Would Take:</h6>
                <button name="WouldTake" onClick={(e) => this.handleButtonChange(e, 1)} className={(this.state.WouldTake && this.state.WouldTakeChanged ? "review-button-active" : "review-button-passive")}>Yes</button>
                <button name="WouldTake" onClick={(e) => this.handleButtonChange(e, 0)} className={(!this.state.WouldTake && this.state.WouldTakeChanged ? "review-button-active" : "review-button-passive")}>No</button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12" id="review-col-2">
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = easiest class i've ever taken<br></br>10 = no life besides the class</span>
                Overall Difficulty:</h6><input type="number" className="review-element-input" value={this.state.OverallDiff} onChange={this.handleInputChange} name="OverallDiff"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = mindless work<br></br>10 = This isn't even worth my time</span>
                Homework Difficulty:</h6><input type="number" className="review-element-input" value={this.state.HomeworkDiff} onChange={this.handleInputChange} name="HomeworkDiff"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = straight out of a horror movie<br></br>10 = We're hanging out next week</span>
                Teacher Likeness:</h6><input type="number" className="review-element-input" value={this.state.TeacherLikeness} onChange={this.handleInputChange} name="TeacherLikeness"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text"><span className="tool">1 = the exam didn't exist<br></br>10 = went into the exam with an a and finished with an f</span>
                Exam Difficulty:</h6><input type="number" className="review-element-input" value={this.state.ExamDiff} onChange={this.handleInputChange} name="ExamDiff"></input><h6 className="review-element-text">/10</h6>
              </div>
              <div className="review-review-element">
                <h6 className="review-element-text">
                Mandatory Attendence:</h6>
                <button name="MandatoryAttendence" onClick={(e) => this.handleButtonChange(e, 1)} className={(this.state.MandatoryAttendence && this.state.MandatoryAttendenceChanged ? "review-button-active" : "review-button-passive")}>Yes</button>
                <button name="MandatoryAttendence" onClick={(e) => this.handleButtonChange(e, 0)} className={(!this.state.MandatoryAttendence && this.state.MandatoryAttendenceChanged ? "review-button-active" : "review-button-passive")}>No</button>
              </div>
            </div>
          </div>
        </div>
        <div className="review-footer">
          {this.renderErrorText()}
          <button className="review-footer-submit" onClick={this.submit}>Submit</button>
        </div>
      </div>
    );
  }
}
export default Review;
