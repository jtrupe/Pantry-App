$.ajax({
  url: "/api/recipes/pantry",
  type: "GET"
}).done(function(res) {
  $(".recipes").empty();
  res.forEach(function(val) {
    // create div containing photo and title of recipe
    var titleDiv = $("<div>");
    var image = $("<IMG>").attr("src", val.image);
    var title = $("<h4>").text(val.title);
    titleDiv.append(image);
    titleDiv.append(title);
    $(".recipes").append(titleDiv);

    //create div containing list of items needed and is in pantry
    var usedItemsDiv = $("<div>");
    var usedItemsTitle = $("<ul>").text("Items you have:");
    for (key in val.usedIngredients) {
      var usedItemsList = $("<li>").text(val.usedIngredients[key].name);
      usedItemsTitle.append(usedItemsList);
    }
    usedItemsDiv.append(usedItemsTitle);
    $(".recipes").append(usedItemsDiv);

    // create div containing list of items needed and is NOT in pantry
    var neededItemsDiv = $("<div>");
    var neededItemsTitle = $("<ul>").text("Items you need:");
    for (key in val.missedIngredients) {
      var neededItemsList = $("<li>").text(val.missedIngredients[key].name);
      neededItemsTitle.append(neededItemsList);
    }
    neededItemsDiv.append(neededItemsTitle);
    $(".recipes").append(neededItemsDiv);

    // hr tag for separation
    $(".recipes").append("<hr>");
  });
});
