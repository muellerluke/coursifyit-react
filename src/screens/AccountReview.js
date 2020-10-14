import React from "react";
import "./styles/AccountReview.css";
import { changeReview } from "../api";

class AccountReview extends React.Component {
    constructor(props) {
        super(props);
        var teacher = this.getTeacherIndex();
        var review = this.getReviewIndex();
        this.state = {
            showDetails: false,
            school: this.props.review.School,
            course: this.props.review.Classes[0].Code,
            teacher: this.props.review.Classes[0].Teachers[teacher].Name,
            id: this.props.review.Classes[0].Teachers[teacher].Reviews[review]._id,
            multitasking: this.props.review.Classes[0].Teachers[teacher].Reviews[review].Multitasking,
            mandatory: this.props.review.Classes[0].Teachers[teacher].Reviews[review].MandatoryAttendence,
            wouldTake: this.props.review.Classes[0].Teachers[teacher].Reviews[review].WouldTake,
            teacherness: this.props.review.Classes[0].Teachers[teacher].Reviews[review].Teacherness,
            homeworkAmount: this.props.review.Classes[0].Teachers[teacher].Reviews[review].HomeworkAmount,
            quizDiff: this.props.review.Classes[0].Teachers[teacher].Reviews[review].QuizDiff,
            testDiff: this.props.review.Classes[0].Teachers[teacher].Reviews[review].TestDiff,
            overallDiff: this.props.review.Classes[0].Teachers[teacher].Reviews[review].OverallDiff,
            homeworkDiff: this.props.review.Classes[0].Teachers[teacher].Reviews[review].HomeworkDiff,
            teacherLikeness: this.props.review.Classes[0].Teachers[teacher].Reviews[review].TeacherLikeness,
            examDiff: this.props.review.Classes[0].Teachers[teacher].Reviews[review].ExamDiff,
            teacherIndex: teacher,
            reviewIndex: review,
            reviewUpdated: false,
        };
        this.toggleMultitasking = this.toggleMultitasking.bind(this);
        this.toggleMandatory = this.toggleMandatory.bind(this);
        this.toggleWouldTake = this.toggleWouldTake.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
        this.getTeacherIndex = this.getTeacherIndex.bind(this);
        this.getReviewIndex = this.getReviewIndex.bind(this);
        this.updateReview = this.updateReview.bind(this);
        this.reviewValueChange = this.reviewValueChange.bind(this);
        this.reviewUpdated = this.reviewUpdated.bind(this);
    }

    getTeacherIndex() {
        var index = 0;
        this.props.review.Classes[0].Teachers.forEach((element, i) => {
            if (element !== "" && element.Reviews.length > 0) {  
                index = i;
            }
        });
        return index;  
    }

    getReviewIndex() {
        var teacherIndex = this.getTeacherIndex();
        var reviewIndex = 0;
        this.props.review.Classes[0].Teachers[teacherIndex].Reviews.forEach((element, i) => {
            if (element !== '') {
                reviewIndex = i;
            }
        })
        return reviewIndex;
    }

    componentDidMount() {
    }

    reviewUpdated() {
        if (this.state.reviewUpdated) {
            return (
                <h6 className="review-updated-text">
                    Review Updated!
                </h6>
            )
        }
    }

    updateReview() {
        var review = {
            school: this.state.school,
            course: this.state.course,
            teacher: this.state.teacher,
            id: this.state.id,
            multitasking: this.state.multitasking,
            mandatory: this.state.mandatory,
            wouldTake: this.state.wouldTake,
            teacherness: this.state.teacherness,
            homeworkAmount: this.state.homeworkAmount,
            quizDiff: this.state.quizDiff,
            testDiff: this.state.testDiff,
            overallDiff: this.state.overallDiff,
            homeworkDiff: this.state.homeworkDiff,
            teacherLikeness: this.state.teacherLikeness,
            examDiff: this.state.examDiff
        }
        changeReview(review).then((json) => {
            this.setState({reviewUpdated: true});
        })
    }

    reviewValueChange = e => {
        if (e.target.value > 0 && e.target.value < 11)
        this.setState({ [e.target.name]: e.target.value })
    }
    toggleDetails() {
        this.setState({ showDetails: !this.state.showDetails });
    }
    toggleMultitasking(e) {
        if (e.target.innerHTML === "Yes" && this.state.multitasking === 0) {
            this.setState({multitasking: 1});
        } else if (e.target.innerHTML === "No" && this.state.multitasking === 1) {
            this.setState({multitasking: 0});
        }
    }
    toggleMandatory(e) {
        if (e.target.innerHTML === "Yes" && this.state.mandatory === 0) {
            this.setState({mandatory: 1});
        } else if (e.target.innerHTML === "No" && this.state.mandatory === 1) {
            this.setState({mandatory: 0});
        }
    }
    toggleWouldTake(e) {
        if (e.target.innerHTML === "Yes" && this.state.wouldTake === 0) {
            this.setState({wouldTake: 1});
        } else if (e.target.innerHTML === "No" && this.state.wouldTake === 1) {
            this.setState({wouldTake: 0});
        }
    }

    renderDetails() {
        if (this.state.showDetails) {
            return (
                <div className="details-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="account-review-element">
                                <h6>Teacherness:</h6>
                                <input type="number" className="account-review-input" name="teacherness" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].Teacherness} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Homework Amount:</h6>
                                <input type="number" className="account-review-input" name="homeworkAmount" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].HomeworkAmount} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Quiz Difficulty:</h6>
                                <input type="number" className="account-review-input" name="quizDiff" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].QuizDiff} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Test Difficulty:</h6>
                                <input type="number" className="account-review-input" name="testDiff" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].TestDiff} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Multitasking Allowed: </h6>
                                <button onClick={this.toggleMultitasking} className={this.state.multitasking ? "account-review-button-active" : "account-review-button-passive"}>Yes</button>
                                <button onClick={this.toggleMultitasking} className={!this.state.multitasking ? "account-review-button-active" : "account-review-button-passive"}>No</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="account-review-element">
                                <h6>Overall Difficulty:</h6>
                                <input type="number" className="account-review-input" name="overallDiff" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].OverallDiff} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Homework Difficulty:</h6>
                                <input type="number" className="account-review-input" name="homeworkDiff" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].HomeworkDiff} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Teacher Likeness:</h6>
                                <input type="number" className="account-review-input" name="teacherLikeness" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].TeacherLikeness} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Exam Difficulty:</h6>
                                <input type="number" className="account-review-input" name="examDiff" onChange={this.reviewValueChange}
                                placeholder={this.props.review.Classes[0].Teachers[this.state.teacherIndex].Reviews[this.state.reviewIndex].ExamDiff} />
                                <h6>/10</h6>
                            </div>
                            <div className="account-review-element">
                                <h6>Mandatory Attendence: </h6>
                                <button onClick={this.toggleMandatory} className={this.state.mandatory ? "account-review-button-active" : "account-review-button-passive"}>Yes</button>
                                <button onClick={this.toggleMandatory} className={!this.state.mandatory ? "account-review-button-active" : "account-review-button-passive"}>No</button>
                            </div>
                            <div className="account-review-element">
                                <h6>Would Take: </h6>
                                <button onClick={this.toggleWouldTake} className={this.state.wouldTake ? "account-review-button-active" : "account-review-button-passive"}>Yes</button>
                                <button onClick={this.toggleWouldTake} className={!this.state.wouldTake ? "account-review-button-active" : "account-review-button-passive"}>No</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="account-review-update-button" onClick={this.updateReview}>
                                Update Review
                            </button>
                        </div>
                        <div className="col-12">
                            {this.reviewUpdated()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <li className="account-review-list-item">
                <div className="row account-review-row" onClick={this.toggleDetails}>
                    <div className="col-lg-4 col-md-4 col-sm-12"><h5 className="account-review-text">Course: {this.props.review.Classes[0].Code}</h5></div>
                    <div className="col-lg-4 col-md-4 col-sm-12"><h5 className="account-review-text">Teacher: {this.props.review.Classes[0].Teachers[0].Name}</h5></div>
                    <div className="col-lg-4 col-md-4 col-sm-12 button-column">
                        <button className="account-review-delete" >Delete</button>
                    </div>
                </div>
                {this.renderDetails()}
            </li>
        );
    }
}

export default AccountReview;