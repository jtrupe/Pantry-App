// $("#user-create").click(function() {
//   var newUserName = $("#signup-email")
//     .val()
//     .trim();
//   $("#signup-email").val("");
//   // this ensures an empty username cannot be submitted.
//   if (newUserName.length === 0) {
//     return;
//   }
//   var newUserPassword = $("#signup-password")
//     .val()
//     .trim();
//   $("#signup-password").val("");
//   // this ensures an empty username cannot be submitted.
//   if (newUserName.length === 0) {
//     return;
//   }
//   // ajax post to create a new user.
//   $.ajax({
//     url: "/api/user/create",
//     type: "POST",
//     data: {
//       email: newUserName,
//       password: newUserPassword
//     }
//   }).then(function(res) {
//     userId = res;
//     window.sessionStorage.setItem("loggedInUser", userId);
//     console.log(res);
//     // console.log(this.id)
//     // redirect browser to returned route.
//     window.location = "/pantry/manage";
//   });
// });

// // $("#user-select").change(function() {
// //   userId = this.value;
// //   console.log(userId);
// //   window.sessionStorage.setItem("loggedInUser", userId);
// //   window.location = "/recipes/pantry";
// // });

// $(document).ready(function() {
//   $("#user-select").on("click", function(e) {
//     e.preventDefault();
//     console.log("test");

//     const userObj = {
//       email: $("#login-email")
//         .val()
//         .trim(),
//       password: $("#login-password")
//         .val()
//         .trim()
//     };

//     $.ajax({
//       method: "POST",
//       url: "/api/user/login",
//       data: userObj
//     });
//     userId = this.value;
//     window.sessionStorage.setItem("loggedInUser", userId);
//     window.location = "/recipes/pantry";
//   });
// });
$(document).ready(function() {
  $("#user-create").on("click", function(e) {
    e.preventDefault();
    console.log("test");

    const userObj = {
      email: $("#signup-email")
        .val()
        .trim(),
      password: $("#signup-password")
        .val()
        .trim()
    };

    $.ajax({
      method: "POST",
      url: "/api/user/signup",
      data: userObj
    });
    // .then(function(res) {
    //       userId = res;
    //       window.sessionStorage.setItem("loggedInUser", userId);
    //       console.log(res);
    //       console.log(this.id)
    // redirect browser to returned route.
    window.location = "/pantry/manage";
  });
});
$(document).ready(function() {
  $("#user-select").on("click", function(e) {
    e.preventDefault();
    console.log("test");

    const userObj = {
      email: $("#login-email")
        .val()
        .trim(),
      password: $("#login-password")
        .val()
        .trim()
    };

    $.ajax({
      method: "POST",
      url: "/api/user/login",
      data: userObj
    });
  });
});
