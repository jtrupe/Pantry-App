$("#ingredient-search").keyup(function() {
  var itemToSearch = $("#ingredient-search")
    .val()
    .trim();

  console.log(itemToSearch);

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
    res.forEach(function(val) {
      console.log(val.name);
    });
  });
});
