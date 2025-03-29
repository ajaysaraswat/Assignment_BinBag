const User = require("../models/userSchema");
const { validateToken } = require("../service/auth.js");
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
    // Get token from request headers (not cookies)
    console.log("token ", req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = validateToken(token);

    // Check if the token is valid
    if (!decoded || decoded.error) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Find user by ID from decoded token
    const user = await User.findById(decoded._id).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleLogout,
  handleProfileRetrieval,
};
