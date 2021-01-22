import React from "react";
import "./styles/Search.css";
import { requestSchools, requestCourses, getReviewResults, getUnlockedReviews, unlockClass } from "../api";
import SearchResult from "./SearchResult";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolText: "",
      courseText: "",
      results: 0,
      id: "",
      schools: [],
      courses: [],
      courseOptions: [],
      reviewData: [],
      reviewsLoaded: false,
      checkedForCourses: true,
      reviewUnlocked: false,
    };
    this.getSchools = this.getSchools.bind(this);
    this.getCourses = this.getCourses.bind(this);
    this.getResults = this.getResults.bind(this);
    this.schoolTextChange = this.schoolTextChange.bind(this);
    this.courseTextChange = this.courseTextChange.bind(this);
    this.renderSchools = this.renderSchools.bind(this);
    this.renderCourses = this.renderCourses.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.getRevealButton = this.getRevealButton.bind(this);
    this.unlock = this.unlock.bind(this);
  }
  componentDidMount() {

  }

  schoolTextChange (e) {
    this.setState({schoolText: e.target.value.toUpperCase()});
    this.getSchools();
  }

  courseTextChange (e) {
    var text = e.target.value.toUpperCase();
    text = text.replace(/\s/g, '');
    text = text.replace(/\W/g, '');
    this.setState({courseText: text.toUpperCase()});
    this.setState({checkedForCourses: false});
    this.getCourses();
    if (this.state.courses.length > 0) {
      var tempArr = [];
      var total = 0;
      this.state.courses.forEach((course) => {
        if (course.Code.indexOf(text) >= 0 && total <= 5) {
          tempArr.push(course);
          total++;
        }
      })
      this.setState({courseOptions: tempArr});
    }
  }

  getSchools() {
    if (this.state.results > 5 || this.state.results === 0)
    requestSchools(this.state.schoolText).then((json) => {
      var data = json.data
      if (data) {
        if (data.length < 5) {
          this.setState({schools: data});
        } else {
          this.setState({results: data.length});
        } 
      }
    })
  }

  getCourses() {
    if (!this.state.checkedForCourses && this.state.courseText.length === 1) {
      requestCourses(this.state.schoolText).then((json) => {
        var data = json.data[0].Classes;
        this.setState({checkedForCourses: true, courses: data});
      });
    }
  }

  getResults() {
    getUnlockedReviews().then((unlockedResponse) => {
      this.setState({reviewData: [], reviewUnlocked: false});
      getReviewResults(this.state.schoolText, this.state.courseText).then((json) => {
        json.forEach((j) => {
          if (j.Classes.length === 0 || j.Classes.length === undefined) {
            return;
          }
          //specific json
          j.Classes.forEach((i) => {
            this.setState({id: i._id});
            if (unlockedResponse) {
              unlockedResponse.forEach((element) => {
                if (element === i._id) {
                  this.setState({reviewUnlocked: true});
                }
              })
            }
            //specific class
            i.Teachers.forEach((t) => {
              //t = specific teacher
                var total = {
                Teacher: t.Name,
                reviews: 0,
                WouldTake: 0,
                Teacherness: 0,
                OverallDiff: 0,
                HomeworkAmount: 0,
                HomeworkDiff: 0,
                QuizDiff: 0,
                TeacherLikeness: 0,
                TestDiff: 0,
                ExamDiff: 0,
                Multitasking: 0,
                MandatoryAttendence: 0,
              };
              t.Reviews.forEach((r) => {
                total.reviews++;
                //r = each review
                total.WouldTake = total.WouldTake + r.WouldTake;
                total.Teacherness = total.Teacherness + r.Teacherness;
                total.OverallDiff = total.OverallDiff + r.OverallDiff;
                total.HomeworkAmount = total.HomeworkAmount + r.HomeworkAmount;
                total.HomeworkDiff = total.HomeworkDiff + r.HomeworkDiff;
                total.QuizDiff = total.QuizDiff + r.QuizDiff;
                total.TeacherLikeness =
                  total.TeacherLikeness + r.TeacherLikeness;
                total.TestDiff = total.TestDiff + r.TestDiff;
                total.ExamDiff = total.ExamDiff + r.ExamDiff;
                total.Multitasking = total.Multitasking + r.Multitasking;
                total.MandatoryAttendence =
                  total.MandatoryAttendence + r.MandatoryAttendence;
              });
              total.WouldTake = total.WouldTake / total.reviews;
                total.Teacherness = total.Teacherness / total.reviews;
                total.OverallDiff = total.OverallDiff / total.reviews;
                total.HomeworkAmount = total.HomeworkAmount / total.reviews;
                total.HomeworkDiff = total.HomeworkDiff / total.reviews;
                total.QuizDiff = total.QuizDiff / total.reviews;
                total.TeacherLikeness =
                  total.TeacherLikeness / total.reviews;
                total.TestDiff = total.TestDiff / total.reviews;
                total.ExamDiff = total.ExamDiff / total.reviews;
                total.Multitasking = total.Multitasking *100 / total.reviews;
                total.MandatoryAttendence =
                  total.MandatoryAttendence * 100 / total.reviews;
              var tempArr = this.state.reviewData;
              tempArr.push(total);
              this.setState({reviewData: tempArr});
            });
          });
        });
        this.setState({reviewsLoaded: true});
      });
    })
  }

  renderCourses() {
    if (this.state.courseOptions.length > 0) {
      return (
        this.state.courseOptions.map((elem, i) => 
          <option key={i}>{elem.Code}</option>
        )
      )
    }
  }

  renderSchools() {
    if (this.state.schools.length > 0) {
      return (
        this.state.schools.map((elem, i) => 
          <option key={i}>{elem.School}</option>
        )
      )
    }
  }
  
  renderResults() {
    if (this.state.reviewsLoaded) {
      return (
        this.state.reviewData.map((elem, i) => 
        <SearchResult key={i} review={elem} unlocked={this.state.reviewUnlocked}></SearchResult>
        )
      )
    }
  }

  getRevealButton() {
    if (this.state.reviewsLoaded) {
      if (this.state.reviewUnlocked) {
        return (
          <div className="search-reveal-div">
            <button className="search-reveal-button">
              Details already unlocked.
            </button>
          </div>
        )
      } else {
        return (
          <div className="search-reveal-div">
            <button className="search-reveal-button" onClick={this.unlock}>
              Reveal Details for this class.
            </button>
          </div>
        )
      }
    }
  }
  unlock() {
    if (this.props.loggedIn) {
      if(localStorage.getItem("searches") > 0 && window.confirm("Are you sure you want to use a search token to unlock details for this course? You have " + localStorage.getItem("searches") + 
        " search tokens.")) {
        unlockClass(this.state.id).then((response) => {
          if (response) {
            this.setState({reviewUnlocked: true});
            this.props.updateSearchTokens();
          }
        })
      } else {
        window.confirm("Uh oh! You're out of search tokens. Review classes to earn search tokens.");
      }
    } else {
      window.confirm("Oops. You have to be logged in to reveal the details for a course.");
    }
  }

  render() {
    return (
    <div className="search-body">
      <div className="search-form" >
        <div className="search-form-header">
          <h1>Find Your Courses Here</h1>
        </div>
        <div className="row" id="search-input-row">
          <div className="col-lg-5 col-md-5 col-sm-12" id="school-col">
           <input className="search-input" id="search-school-input" placeholder="School"
           autoComplete="off" list="schoolList" value={this.state.schoolText} onChange={this.schoolTextChange}></input>
           <datalist id="schoolList">
            {this.renderSchools()}
          </datalist>
         </div>
          <div className="col-lg-5 col-md-5 col-sm-12" id="course-col">
           <input className="search-input" id="search-course-input" placeholder="Course Code"
           autoComplete="off" list="courseList" value={this.state.courseText} onChange={this.courseTextChange}></input>
          <datalist id="courseList">
            {this.renderCourses()}
          </datalist>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-12" id="search-col">
           <button id="search-button" onClick={this.getResults}>Search</button>
         </div>
        </div>
      </div>
      {this.renderResults()}
      {this.getRevealButton()}
    </div>
    );
  }
}
export default Search;
