// function to execute search recipe by name by altering html route.
function searchRecipeByName() {
  // record recipe name
  const recipeName = $("#recipe-name")
    .val()
    .trim();

  // alter window location
  window.location = "/recipes/search/name/" + recipeName;
}

// event listener for search button on search recipe by name page.
$("#search-recipe-name").click(searchRecipeByName);

// event listener for search text input field on search recipe by name page.
// this is necessary in the event that the user presses 'Return' to initiate a search.
$("#recipe-name").keyup(function(event) {
  // keyCode 13 = Return
  if (event.keyCode === 13) {
    searchRecipeByName();
  }
});

// event listener to direct the user to the recipe details page.
$(".recipe-item").click(function() {
  const recipeId = $(this).attr("data-recipe-id");
  window.location = "/recipe/details/" + recipeId;
});

// event listener to add an additional ingredient input when searching recipes by ingredients.
$("#add-ingredient").click(function() {
  // copy dive containing all necessary inputs and tags.
  const newDiv = $(".ingredient-item-div:first").clone();
  // remove text from the copied input
  newDiv.find("input").val("");
  // append that copy to search-ingredients div.
  $(".search-ingredients").append(newDiv);
});

// event listener to remove an ingredient input when searching recipes by ingredients.
$(document).on("click", ".ingredient-item-remove", function() {
  // if the user is attempting to remove the only ingredient input, only clear input.
  if ($(".ingredient-item-div").length - 1 === 0) {
    $(this)
      // remove text input but do not remove item
      .parent()
      .parent()
      .parent()
      .find("input")
      .val("");
  } else {
    // remove item
    $(this)
      .parent()
      .parent()
      .parent()
      .remove();
  }
});

// event listener to initiate search of recipes by ingredients input by user.
$("#search-recipe-ingredients").click(function() {
  // initialize array containing all ingredients in which to search.
  var ingredientsArr = [];
  // loop through each input, extracting user input ingredients.
  $(".ingredient-item").each(function(index, element) {
    // add ingredient to ingredientsArr
    ingredientsArr.push(element.value);
  });

  // append ingredients as a string to the url
  window.location = "/recipes/search/ingredients/" + ingredientsArr.join();
});
