$("#search-recipe-name").click(function() {
  var recipeName = $("#recipe-name")
    .val()
    .trim();
  window.location = "/recipes/search/name/" + recipeName;
});

$(".recipe-item").click(function() {
  var recipeId = $(this).attr("data-recipe-id");
  console.log(recipeId);
  window.location = "/recipe/details/" + recipeId;
});
