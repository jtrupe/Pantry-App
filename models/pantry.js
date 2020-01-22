module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    measure:{
      type :  DataTypes.SRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Ingredient;
};
