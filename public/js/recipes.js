$("#search-recipe-name").click(function() {
  var recipeName = $("#recipe-name")
    .val()
    .trim();
  window.location = "/recipes/search/name/" + recipeName;
});

$(".recipe-item").click(function() {
  var recipeId = $(this).attr("data-recipe-id");
  window.location = "/recipe/details/" + recipeId;
});

$("#add-ingredient").click(function() {
  var newDiv = $(".ingredient-item-div:first").clone();
  newDiv.find("input").val("");
  $(".search-ingredients").append(newDiv);
});

$(document).on("click", ".ingredient-item-remove", function() {
  if ($(".ingredient-item-div").length - 1 === 0) {
    $(this)
      .parent()
      .find("input")
      .val("");
  } else {
    $(this)
      .parent()
      .remove();
  }
});

$("#search-recipe-ingredients").click(function() {
  var ingredientsArr = [];
  $(".ingredient-item").each(function(index, element) {
    ingredientsArr.push(element.value);
  });
  window.location = "/recipes/search/ingredients/" + ingredientsArr.join();
});
