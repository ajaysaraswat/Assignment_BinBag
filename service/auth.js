require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY || "$BinBag#123";

function createTokenforUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  if (!token) return null;
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  createTokenforUser,
  validateToken,
};
