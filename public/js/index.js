$("#user-create").click(function (event) {
  const newUserName = $("#username-create").val().trim();

  // this ensures an empty username cannot be submitted.
  if (newUserName.length === 0) {
    return
  };

  // ajax post to create a new user.
  $.ajax({
    url: '/api/user/create',
    type: 'POST',
    data: {
      name: newUserName,
      password: "newPassword"
    }
  }).done((res, rej) => {
    userId = res

    // redirect browser to returned route.
    window.location = "/pantry/manage";
  });
});

$("#user-select").change(function (event) {
  userId = this.value;
  console.log(userId)
  window.location = "/recipes";
});
