let userId = window.sessionStorage("loggedInUser")

// helper functions for manipulating data
// only needs id from logged in user

// (1) converts binary string to array containing position of 1s in said string
function keyToArr(str) {
    let pantryArr = [];
    for (let i = 1; i <= str.length; i++) {
      if (str.charAt(i) == 1) {
        pantryArr.push(i)
      }
      return pantryArr;
    }
  }
  
  // (2) converts array to string separated by commas
  function arrToString(arr) {
    pantryString = "";
    for (let i = 0; i < arr.length; i++) {
      if (i < (arr.length - 1)) {
        pantryString += arr[i] + ", ";
      } else if (i == (arr.length - 1)) {
        pantryString += arr[i];
      }
    }
    return pantryString;
  }
  
  // (3) converts array of ingredient IDs from (1) to corresponding array of ingredients
  function toIngArr(user) {
    db.User.findOne({
      where: { id: user }
    }).then(function (res) {
      idArr = keyToArr(res.pantryKey);
      console.log(idArr);
      let ingredientArr = [];
      for (const element of idArr) {
        db.Ingredient.findOne({
          where: { id: element }
        }).then(function(result){
          ingredient = result.name;
          ingredientArr.push(ingredient)
        })
      }
      return ingredientArr;
    })
  }
  
  // STILL NEEDS validate keys array and ingredients array are same length
  // (4) convert array of ingredients to comma separated string (3) => (2)
  let pantryWithCommas = arrToString(toIngArr(userID));
  console.log(pantryWithCommas);
  
  // (5) create pantry object => [keys : id] : [values: name] { (1) : (3)}
  function objifyPantry(keysArr, pantryArr){
    let keys = keysArr;
    let values = pantryArr;
    let pantryObj = {}
    keys.forEach((key, i) => pantryObj[key] = values[i]);
    console.log(pantryObj);
    return(pantryObj);
  }