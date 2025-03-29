const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleLogout,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route is working");
});

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.post("/logout", handleLogout);

module.exports = router;
