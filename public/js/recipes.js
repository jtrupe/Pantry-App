$("#search-recipe-name").click(function() {
  var recipeName = $("#recipe-name")
    .val()
    .trim();
  window.location = "/recipes/search/name/" + recipeName;
});
