/* eslint-disable prettier/prettier */
$("#user-create").click(function() {
  var newUserName = $("#username-create").val().trim();

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
  }).done(function(res) {
    userId = res;

    // redirect browser to returned route.
    window.location = "/pantry/manage";
  });
});

$("#user-select").change(function() {
  userId = this.value;
  console.log(userId);
  window.location = "/recipes";
});
