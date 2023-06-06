const { comparePassword, encodeToken } = require("../helpers/helper");
const { User } = require("../models/");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        role: "admin",
        address,
      });
      res.status(201).json({
        message: `user with email ${email} succesfully created`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
