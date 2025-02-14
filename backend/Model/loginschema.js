const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Corrected required syntax
  email: { type: String, required: true, unique: true }, // Unique ensures no duplicate emails
  password: { type: String, required: true },
  accId: { type: String, required: true, unique: true }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
