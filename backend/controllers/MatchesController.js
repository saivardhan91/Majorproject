const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const Person = require("../Model/Form");

const router = express.Router();

class MatchesData {
    async getMatches(req, res) {
        try {
            const { userId } = req.params;
            console.log("🔹 Received userId:", userId);

            // Validate if userId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                console.error("❌ Invalid userId format");
                return res.status(400).json({ success: false, message: "Invalid user ID format" });
            }

            // Convert userId to ObjectId and fetch user profile
            const userProfile = await Person.findOne({ userId: new mongoose.Types.ObjectId(userId) });

            // console.log("🔹 Fetched User Profile:", userProfile);

            if (!userProfile) {
                console.error("❌ User profile not found");
                return res.status(404).json({ success: false, message: "User profile not found" });
            }

            // Determine the opposite gender
            const oppositeGender = userProfile.gender.toLowerCase() === "male" ? "Female" : "Male"; // Case-sensitive
            console.log("🔹 Searching for opposite gender:", oppositeGender);

            // Fetch profiles of the opposite gender
            const matches = await Person.find({ gender: oppositeGender });

            // console.log("🔹 Matched Users:", matches);

            res.status(200).json({ success: true, data: matches });
        } catch (error) {
            console.error("🔥 Error fetching matches:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

module.exports = new MatchesData();