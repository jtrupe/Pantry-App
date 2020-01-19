$("#ingredient-search").keyup(function() {
  var itemToSearch = $("#ingredient-search")
    .val()
    .trim();

  $(".returned-search-items").empty();

  // this ensures an empty itemToSearch cannot be queried to the API
  if (itemToSearch.length === 0) {
    return;
  }

  // ajax get to find ingredient matches.
  $.ajax({
    url: "/api/ingredient/search",
    type: "GET",
    data: { ingredientName: itemToSearch }
  }).done(function(res) {
    $(".returned-search-items").empty();
    res.forEach(function(val) {
      console.log(val.name);
      var newDiv = $("<div>");
      var itemName = $("<p>").text(val.name);
      var addBtn = $("<button>").text("Add Item");
      newDiv.append(itemName);
      newDiv.append(addBtn);
      $(".returned-search-items").append(newDiv);
    });
  });
});

// event listener to alter quantity of pantry item
$(".pantry-item-alter").click(function() {
  var itemId = this.value;
  console.log("Alter item quantity ID " + itemId + " from user database");
  $.ajax({
    url: "/pantry/ingredient/update",
    type: "PUT",
    data: { ingredientId: itemId }
  }).done(function(res) {
    console.log("Done");
    window.location = res.redirect;
  });
});

// event listener to remove pantry item
$(".pantry-item-remove").click(function() {
  var itemId = this.value;
  console.log("Remove item ID " + itemId + " from user database");
  $.ajax({
    url: "/pantry/ingredient/remove",
    type: "DELETE",
    data: { ingredientId: itemId }
  }).done(function(res) {
    console.log("Done");
    window.location = res.redirect;
  });
});
