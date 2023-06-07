const Controller = require("../controllers");
const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);

userRouter.post("/login", Controller.login);

userRouter.get("/getpoke", Controller.getPoke);

userRouter.get("/getpoke/:id", Controller.getPokeDetail);

module.exports = userRouter;
