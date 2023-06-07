const Controller = require("../controllers");
const { authentiaction } = require("../middlewares/auth");
const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);

userRouter.post("/login", Controller.login);

userRouter.get("/getpoke", Controller.getPoke);

userRouter.get("/getpoke/:id", Controller.getPokeDetail);

userRouter.get("/user", authentiaction, Controller.getProfile);

userRouter.patch("/subscribe", authentiaction, Controller.updateStatus);

userRouter.post("/generate-token", authentiaction, Controller.generateToken);

module.exports = userRouter;
