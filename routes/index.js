const userRouter = require("./userRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Poke BM Server Side",
  });
});

router.use(userRouter);

module.exports = router;
