const User = require("../models/userSchema");
const upload = require("../fileUpload/multer");

// Handle user registration
const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password, address, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const profileImageURL = req.file
      ? `/uploads/${req.file.filename}`
      : "/images/avatar.jpeg";

    const newUser = new User({
      name,
      email,
      password,
      address,
      bio,
      profileImageURL,
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

    return res.status(200).json({
      message: "Login successful",
      token, // Send token in response
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: "Incorrect email or password" });
  }
};

// Handle user logout
const handleLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

const handleProfileRetrieval = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleProfileUpdate = async (req, res) => {
  try {
    // Extract user from middleware
    const user = req.user;

    // Update only allowed fields
    const { name, address, bio, profileImageURL } = req.body;
    if (name) user.name = name;
    if (address) user.address = address;
    if (bio) user.bio = bio;
    if (profileImageURL) user.profileImageURL = profileImageURL;

    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleLogout,
  handleProfileRetrieval,
  handleProfileUpdate,
};
