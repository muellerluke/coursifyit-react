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

async function verifyAccount(id, key) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/verify/" + id + "/" + key,
    method: "POST",
  })
    .then((response) => {
     return true;
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

async function forgotMyPassword(emailParam) {
  var apiUrl = "https://class-review.com:4040";
  var email = emailParam.toLowerCase();
  return axios({
    url: apiUrl + "/Account/forgotmypassword/" + email,
    method: "PUT",
  })
  .then(() => {
    return true
  })
  .catch((error) => {
    console.log(error);
    return false
  });
}


async function getReviews() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/Reviews/" + localStorage.getItem("username"),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "GET"
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

async function requestSchools(t) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/schoolslist/" + t + "/schoolslist",
    method: "GET",
  })
    .then(function (json) {
      return json;
    }).catch((error) => {
      console.log(error);
      return false;
    });
}

async function getReviewResults(school, course) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/" + school + "/" + course,
    method: "GET",
  }).then((json) => {
    if (json) {
      return json.data;
    } else {
      return false;
    }
  }).catch((error) => {
    console.log(error);
    return false;
  })
}

async function requestCourses(school) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/" + school,
    method: "GET",
  }).then((json) => {
    if (json) {
      return json;
    } else {
      return false;
    }
  }).catch((e) => {
      console.error(e);
      return false;
    });
}

async function requestTeachers(school, course) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/" + school + "/" + course,
    method: "GET",
  }).then((json) => {
    if (json) {
      return json;
    } else {
      return false;
    }
  }).catch((e) => {
    console.log(e);
    return false;
  })
}

async function getUnlockedReviews() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/Unlocked/" + localStorage.getItem("username"),
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((unlocked) => {
      return unlocked.data;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
}

async function verifyToken() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Token/" + localStorage.getItem("username"),
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((verified) => {
    if (verified) return true;
    else {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      return false;
    }
  }).catch((e) => {
    console.error(e);
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    return false;
  });
}

async function unlockClass(id) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url:
      apiUrl +
      "/Account/Unlocked/" +
      localStorage.getItem("username") +
      "/" + id,
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  }).then((response) => {
    if (response) {
      localStorage.setItem("searches", localStorage.getItem("searches") - 1);
      return true;
    }
    else return false;
  }).catch((e) => {
    console.log(e);
    return false;
  })
}

async function registerUser(email, password) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/users",
    data: { Email: email, Password: password },
    method: "POST",
  }).then((json) => {
    if (json.data.Username === email){
      return login(email, password).then((response) => {
        return response;
      })
    } else {
      return false;
    }
  }).catch((error) => {
    console.log(error);
    return false;
  })
}

async function deleteAccount() {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/users/" + localStorage.getItem("username"),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "DELETE",
  }).then((response) => {
    logOut();
    return true;
  }).catch((error) => {
    console.log(error);
    alert("There was an error deleting your account.")
    return false;
  })
}

async function postReview(school, course, teacher, review) {
  var tempReview = review;
  tempReview.Username = localStorage.getItem("username");
  var apiUrl = "https://class-review.com:4040";
  return getReviews().then((json) => {
    var reviewExists = false;
    if (json) {
      json.forEach((elem) => {
        if (elem.School === school.trim().toUpperCase() && elem.Classes[0].Code === course.trim().toUpperCase()) {
          for (var i = 0; i < elem.Classes[0].Teachers.length; i++) {
            if (elem.Classes[0].Teachers[i].Name === teacher.trim().toUpperCase()) {
              reviewExists = true;
            }
          }
        }
      })
    }
    if (!reviewExists) {
      return axios({
        url: apiUrl + "/reviewmyclasses/" + school.trim().toUpperCase() + "/" + course.trim().toUpperCase() + "/" + teacher.trim().toUpperCase(),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: tempReview,
        method: "POST"
      }).then((response) => {
        return true
      }).catch((error) => {
        return false;
      }) 
    }
  })

}
async function putPassword(id, password) {
  var apiUrl = "https://class-review.com:4040";
  return axios({
    url: apiUrl + "/Account/resetpassword/" + id,
    method: "PUT",
    data: { Password: password },
  }).then((response) => {
    return true;
  }).catch((error)=> {
    console.log(error);
    return false;
  })
}

export { postReview, login, getReviews, changeReview, logOut, sendVerification, 
  resetPassword, requestSchools, requestCourses, requestTeachers, getReviewResults,
   getUnlockedReviews, verifyToken, unlockClass, forgotMyPassword, registerUser, 
   deleteAccount, verifyAccount, putPassword };
