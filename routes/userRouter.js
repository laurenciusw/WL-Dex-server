const Controller = require("../controllers");
const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);

module.exports = userRouter;
