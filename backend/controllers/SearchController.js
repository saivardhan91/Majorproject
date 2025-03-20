const express = require("express");
const mongoose = require("mongoose");
const User = require("../Model/loginschema");
const Person = require("../Model/Form"); // Ensure Profile is correctly imported
const router = express.Router();

class Search {
  async SearchById(req, res) {
    try {
      const { accId } = req.params;

      if (!accId) {
        return res.status(400).json({ error: "accId is required" });
      }

      const user = await User.findOne({ accId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        accId: user.accId,
      });
    } catch (error) {
      console.error("Error searching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async SearchProfiles(req, res) {
    try {
      const filters = {};
      console.log("Received search query:", req.query);

      // Extract query parameters
      const {
        lookingFor, ageMin, ageMax,
        heightMin, heightMax, maritalStatus,
        religion, caste, motherTongue, country
      } = req.query;

      // Set gender filter
      if (lookingFor) {
        filters.gender = lookingFor === "Bride" ? "Female" : "Male";
      }

      // Age Range Filter
      if (ageMin || ageMax) {
        filters.age = {};
        if (ageMin) filters.age.$gte = parseInt(ageMin);
        if (ageMax) filters.age.$lte = parseInt(ageMax);
      }

      // Other Filters
    //   if (maritalStatus) filters["familyDetails.maritalStatus"] = maritalStatus;
      if (religion) filters.religion = religion;
      if (caste) filters.caste = caste;
    //   if (motherTongue) filters.motherTongue = motherTongue;
      if (country && country.trim() !== "") {
        filters["professionalDetails.country"] = country;
      }

      console.log("Applied Filters:", filters);

      // Search in the database with filters
      const profiles = await Person.find(filters).select(
        "_id name age gender religion caste motherTongue professionalDetails familyDetails bio image userId"
      ).lean();

      res.json(profiles);
    } catch (error) {
      console.error("Error searching profiles:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new Search();
