"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.PokeBox, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: `Email must be in email format`,
          },
          notNull: {
            msg: `Email cannot be empty`,
          },
          notEmpty: {
            msg: `Email cannot be empty`,
          },
        },
        unique: {
          msg: `Email Must be Unique`,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: `password min 5 character`,
          },
          notNull: {
            msg: `Input the password!`,
          },
          notEmpty: {
            msg: `Input the password!`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
