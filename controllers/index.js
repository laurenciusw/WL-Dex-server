const { comparePassword, encodeToken } = require("../helpers/helper");
const { User } = require("../models/");
const axios = require("axios");
const midtransClient = require("midtrans-client");
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
        role: "normal",
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

  //get pokemon
  static async getPoke(req, res, next) {
    try {
      const { name } = req.params;
      const respons = await axios.get("https://pokeapi.co/api/v2/pokedex/1/");
      const pokemon = respons.data.pokemon_entries.slice(0, 151);
      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }

  //detail poke
  static async getPokeDetail(req, res, next) {
    try {
      const { id } = req.params;
      const detail = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );

      res.status(200).json(detail.data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //get profile
  static async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      res.status(200).json({
        id: user.id,
        isSubscribed: user.isSubscribed,
      });
    } catch (error) {
      next(error);
    }
  }

  //change status
  static async updateStatus(req, res, next) {
    try {
      await User.update(
        { isSubscribed: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).json({
        message: `User with id ${req.user.id} is a subscriber now`,
      });
    } catch (error) {
      next(error);
    }
  }

  // generate midtrans token
  static async generateToken(req, res, next) {
    const user = await User.findByPk(req.user.id);

    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANSACTION" + Math.floor(10000 + Math.random() * 90000),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtrans_token = await snap.createTransaction(parameter);

      res.status(200).json(midtrans_token);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
