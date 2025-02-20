const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");
const Person =require("../Model/Form");

const router = express.Router();

class SettingsController {
async changePassword (req, res) {
  try {
    const {userId, currentPassword, newPassword } = req.body;


    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }

} 

async deleteAccount (req, res)  {
  try {
    const userId = req.query.userId; // Get userId from query parameters
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    await Person.deleteMany({ userId });
  
    // Clear JWT token from client (handled by frontend)
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}

module.exports = new SettingsController();
