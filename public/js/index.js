/* eslint-disable prettier/prettier */
$("#user-create").click(function() {
  var newUserName = $("#username-create").val().trim();
  $("#username-create").val("");
  // this ensures an empty username cannot be submitted.
  if (newUserName.length === 0) {
    return;
  }

  // ajax post to create a new user.
  $.ajax({
    url: "/api/user/create",
    type: "POST",
    data: {
      name: newUserName,
      password: "newPassword"
    }
  }).then(function(res) {
    userId = res;
    window.sessionStorage.setItem("loggedInUser", userId)
    console.log(res);
    // console.log(this.id)
    // redirect browser to returned route.
    window.location = "/pantry/manage";
  });
});

$("#user-select").change(function() {
  userId = this.value;
  console.log(userId);
  window.sessionStorage.setItem("loggedInUser", userId)
  window.location = "/recipes/pantry";
});
