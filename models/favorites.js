module.exports= function(sequelize, DataTypes){
    var Favorite = sequelize.define("Favorite", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            validate:{
                len:[1]
            }
        },
        photo: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        recipeData: {
            type: DataTypes.JSON
        },
        lovedBy: {
            type: DataTypes.VARBINARY
        }
    })
}  