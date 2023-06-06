const { decodeToken } = require("../helpers/helper");
const { User } = require("../models/");

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

module.exports = {
  authentiaction,
};
