"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PokeBox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PokeBox.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  PokeBox.init(
    {
      pokeName: DataTypes.INTEGER,
      pokeImg: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PokeBox",
    }
  );
  return PokeBox;
};
