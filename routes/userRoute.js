const express = require("express");
const {
  handleUserRegister,
  handleUserlogin,
  handlelogout,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route is working");
});

router.post("/register", handleUserRegister);
router.post("/login", handleUserlogin);
router.post("/logout", handlelogout);

module.exports = router;
