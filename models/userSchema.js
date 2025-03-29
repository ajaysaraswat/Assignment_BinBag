const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createTokenforUser } = require("../service/auth.js");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/avatar.jpeg",
    },
    bio: {
      type: String,
      minlength: 0,
    },
    address: {
      type: String,
      minlength: 1,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

UserSchema.static(
  "matchPasswordandGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = createTokenforUser(user);
    return token;
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
