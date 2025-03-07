const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");
const Person =require("../Model/Form");
const Shortlist=require("../Model/shortlistschema");
const router = express.Router();

class ShortListController {
 
    
    // ✅ Add a profile to shortlist
    async shortlist (req, res)  {
      try {
        const { userId, profileId } = req.body;
    
        let shortlist = await Shortlist.findOne({ userId });
    
        if (!shortlist) {
          shortlist = new Shortlist({ userId, shortlistedProfiles: [] });
        }
    
        // Check if already shortlisted
        const isAlreadyShortlisted = shortlist.shortlistedProfiles.some(
          (profile) => profile.profileId.toString() === profileId
        );
    
        if (isAlreadyShortlisted) {
          return res.status(400).json({ message: "Profile already shortlisted" });
        }
    
        shortlist.shortlistedProfiles.push({ profileId });
        await shortlist.save();
    
        res.status(200).json({ message: "Profile added to shortlist", shortlist });
      } catch (error) {
        res.status(500).json({ message: "Error adding to shortlist", error });
      }
    }
    
    // ✅ Remove a profile from shortlist
     async deleteShortList (req, res)  {
      try {
        const { userId, profileId } = req.params;
    
        let shortlist = await Shortlist.findOne({ userId });
    
        if (!shortlist) {
          return res.status(404).json({ message: "Shortlist not found" });
        }
    
        shortlist.shortlistedProfiles = shortlist.shortlistedProfiles.filter(
          (profile) => profile.profileId.toString() !== profileId
        );
    
        await shortlist.save();
        res.status(200).json({ message: "Profile removed from shortlist", shortlist });
      } catch (error) {
        res.status(500).json({ message: "Error removing from shortlist", error });
      }
    }
    
    // ✅ Get all shortlisted profiles
     async getShortListUser(req, res) {
      try {
        const { userId } = req.params;
    
        const shortlist = await Shortlist.findOne({ userId }).populate("shortlistedProfiles.profileId");
    
        if (!shortlist) {
          return res.status(404).json({ message: "No shortlisted profiles found" });
        }
    
        res.status(200).json({ shortlistedProfiles: shortlist.shortlistedProfiles });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving shortlist", error });
      }
    }
    
 
    
}

module.exports = new ShortListController();