const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleLogout,
  handleProfileRetrieval,
  handleProfileUpdate,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.post("/logout", handleLogout);

// Protected routes (Require JWT authentication)
router.get("/profile", authenticateUser, handleProfileRetrieval);
router.put("/update", authenticateUser, handleProfileUpdate);

module.exports = router;
