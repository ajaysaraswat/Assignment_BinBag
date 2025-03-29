const User = require("../models/userSchema");

// Handle user registration
const handleUserRegister = async (req, res) => {
  try {
    console.log("body", req.body);
    const { name, email, password, address, bio, profileImageURL } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({
      name,
      email,
      password,

      address,
      bio,
      profileImageURL: profileImageURL || "/images/avatar.jpeg", // Default profile image
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

// Handle user login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const token = await User.matchPasswordandGenerateToken(email, password);
    return res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: "Incorrect email or password" });
  }
};

// Handle user logout
const handleLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleLogout,
};
