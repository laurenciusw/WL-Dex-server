const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Poke BM Server Side",
  });
});

module.exports = router;
