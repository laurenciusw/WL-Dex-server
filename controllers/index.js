const { comparePassword, encodeToken } = require("../helpers/helper");
const { User } = require("../models/");
const axios = require("axios");

class Controller {
  //register
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await User.create({
        email,
        password,
      });
      res.status(201).json({
        message: `user with email ${email} succesfully created`,
      });
    } catch (error) {
      next(error);
    }
  }

  //login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "InvalidCredentials" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidCredentials" };

      let payload = {
        id: user.id,
      };

      let access_token = encodeToken(payload);
      let userRole = user.role;

      res.status(200).json({
        access_token,
        email,
        userRole,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getPoke(req, res, next) {
    try {
      const { name } = req.params;
      const respons = await axios.get("https://pokeapi.co/api/v2/pokedex/1/");
      const pokemon = respons.data.pokemon_entries;
      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
