const User = require("../models/userSchema");
//const { checkRole } = require("../middlewares/authorization");

// Handle user registration
const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password, address, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        error: "Email already registered",
      });
    }

    await User.create({
      name,
      email,
      password,
      role,
      address,
      bio,
      profileImageURL,
    });

    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/register", {
      error: "Error creating user",
    });
  }
};

// Handle user login
const handleUserlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.json({
      error: "Incorrect email or password",
    });
  }
};

// Handle user logout
const handlelogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  handleUserRegister,
  handleUserlogin,
  handlelogout,
};
