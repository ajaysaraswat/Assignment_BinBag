const { validateToken } = require("../service/auth.js");
const User = require("../models/userSchema.js");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = validateToken(token);

    if (!decoded || decoded.error) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user data to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { authenticateUser };
