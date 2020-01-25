module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define(
    "Ingredient",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      measure: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      }
    },
    {
      tableName: "masterPantry",
      timestamps: false
    }
  );
  return Ingredient;
};
