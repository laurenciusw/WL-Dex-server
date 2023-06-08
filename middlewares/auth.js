const { where } = require("sequelize");
const { decodeToken } = require("../helpers/helper");
const { User, PokeBox } = require("../models/");

//user authentication
async function authentiaction(req, res, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = decodeToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    let userId = req.user.id;
    let user = await User.findByPk(userId);
    let isSubscribed = user.isSubscribed;

    let box = await PokeBox.findAll({ where: { userId } });

    if (isSubscribed == false) {
      if (box.length >= 5) {
        throw { name: "Forbidden" };
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  authentiaction,
  authorization,
};
