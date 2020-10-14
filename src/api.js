import axios from "axios";

var username = localStorage.getItem("username");
async function login(username, password) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/login?Username=" + username + "&" + "Password=" + password,
    method: "POST",
    dataType: "json",
  })
    .then((json) => {
      if (json.data.user.Username === username) {
        username = json.data.user.Username;
        localStorage.setItem("token", json.data.token);
        localStorage.setItem("username", json.data.user.Username);
        localStorage.setItem("searches", json.data.user.Searches);
        localStorage.setItem("verified", json.data.user.Verified);
        return json;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

async function logOut() {
  localStorage.setItem("token", "");
  localStorage.setItem("username", "");
  localStorage.setItem("searches", "");
  localStorage.setItem("searches", "")
}

async function getReviews() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/Reviews/" + localStorage.getItem("username"),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((json) => {
    if(json.data) {
      return json.data;
    } else {
      return false;
    }

  }).catch((error) => {
    console.log(error);
    return false;
  })
}

async function changeReview(review) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url:
      apiUrl +
      "/Account/Reviews/" +
      review.school +
      "/" +
      review.course +
      "/" +
      review.teacher +
      "/" +
      review.id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "PUT",
    data: {
      _id: review.id,
      Teacherness: review.teacherness,
      HomeworkAmount: review.homeworkAmount,
      QuizDiff: review.quizDiff,
      TestDiff: review.testDiff,
      Multitasking: review.multitasking,
      OverallDiff: review.overallDiff,
      HomeworkDiff: review.homeworkDiff,
      TeacherLikeness: review.teacherLikeness,
      ExamDiff: review.examDiff,
      MandatoryAttendence: review.mandatory,
      WouldTake: review.wouldTake,
    }
  })
    .then((json) => {
      return json;
    })
    .catch(function (e) {
      console.error(e);
    });
} 

async function sendVerification() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url:
      apiUrl + "/Account/newVerification/" + localStorage.getItem("username"),
    method: "POST",
  }).then((response) => {
    return response;
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

async function resetPassword() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/forgotmypassword/" + localStorage.getItem("username"),
    method: "PUT",
  }).then((response) => {
    return response
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

export { login, getReviews, changeReview, logOut, sendVerification, resetPassword };
