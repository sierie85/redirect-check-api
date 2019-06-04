const express = require("express");
const router = express.Router();
const redirectController = require("./controllers/redirectController");

router.get("/", (req, res) => {
  res.send({ msg: "holla" });
});
router.post("/check-redirect", redirectController.check);

module.exports = router;
