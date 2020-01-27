const db = require("../../models")
// let userId = window.sessionStorage("loggedInUser");

// helper functions for manipulating data
// only needs id from logged in user
var dataMethods = {
  // (1) converts binary string to array containing position of 1s in said string
  keyToArr: function (str) {
    console.log("k2r runs");
    let pantryArr = [];
    for (let i = 1; i <= str.length; i++) {
      if (parseInt(str.charAt(i)) === 1) {
        pantryArr.push(i);
      }
    }
    return pantryArr;
  },
  // (2) converts array to string separated by commas
  arrToString: function (arr) {
    pantryString = "";
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) {
        pantryString += arr[i] + ", ";
      } else if (i === arr.length - 1) {
        pantryString += arr[i];
      }
    }
    return pantryString;
  },


