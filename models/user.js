module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    pantryKey: {
      type: DataTypes.STRING(100).BINARY,
      defaultValue: ""
    }
  },{
    tableName: "Users",
    timestamps: false
  });
  return User;
};
