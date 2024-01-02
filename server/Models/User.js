const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide name"],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "must provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "must provide password"],
      minlength: 4,
    },
    isAdmin: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.username, email: this.email },
    process.env.JWT,
    { expiresIn: "30d" }
  );
};

module.exports = mongoose.model("user", UserSchema);
