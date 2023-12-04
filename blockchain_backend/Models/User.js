const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  age:Number,
  role: String,
  // roles: {
  //   type: [{
  //     type: String,
  //     enum: ['doctor', 'patient']
  //   }],
  //   default: ['patient'] // Default role assigned to a new user
  // },
  createdAt: {
    type: Date,
    default: Date.now // Set default value to current date/time
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
