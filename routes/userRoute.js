const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleProfileRetrieval,
  handleLogout,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route is working");
});

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/profile", handleProfileRetrieval);
router.post("/logout", handleLogout);

module.exports = router;
