const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");
const Person =require("../Model/Form");

const router = express.Router();

class ProfileDetailsController {
    async  PersonalBio(req, res) {
        try {
            const { userId } = req.params;
            const { bio } = req.body;
        
            if (!userId) {
              return res.status(400).json({ message: "User ID is required" });
            }
        
            const updatedUser = await Person.findOneAndUpdate(
              { userId },
              { bio },
              { new: true }
            );
        
            if (!updatedUser) {
              return res.status(404).json({ message: "User profile not found" });
            }
        
            res.status(200).json({ success: true, message: "Bio updated successfully", data: updatedUser });
          } catch (error) {
            console.error("Error updating bio:", error);
            res.status(500).json({ success: false, message: "Server error" });
          }
      }

      async BasicDetails(req, res) {
        try {
          const { userId } = req.params;
          const { familyDetails, motherTongue } = req.body;
        console.log(familyDetails);
          if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
          }
      
          const updatedUser = await Person.findOneAndUpdate(
            { userId },
            {
              $set: {
                "familyDetails.height.feet": familyDetails?.height?.feet || 0,
                "familyDetails.height.inches": familyDetails?.height?.inches || 0,
                "familyDetails.maritalStatus": familyDetails?.maritalStatus || "Single",
                motherTongue: motherTongue || "",
              },
            },
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User profile not found" });
          }
      
          res.status(200).json({ success: true, message: "User details updated successfully", data: updatedUser });
        } catch (error) {
          console.error("Error updating user data:", error);
          res.status(500).json({ success: false, message: "Server error" });
        }
    }
}

module.exports = new ProfileDetailsController();
