const express = require("express");
const mongoose = require("mongoose");
const Person = require("../Model/Form");
const PreferenceModel = require("../Model/preference");

const router = express.Router();

class PreferenceController {
    constructor() {}

    async setPreference(req, res) {
        try {
            console.log("Request received:", req.body);
            let { userId, gender, ...preferences } = req.body;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format" });
            }

            // ✅ Convert `userId` to ObjectId
            const objectId = new mongoose.Types.ObjectId(userId);

            // ✅ Check if user exists in Person collection
            const userExists = await Person.findOne({ userId: objectId });
            if (!userExists) {
                return res.status(404).json({ message: "User not found in Person collection" });
            }

            // Ensure gender is an array (if needed)
            // Ensure gender is always an array
            if (Array.isArray(gender)) {
                gender = gender[0] || ""; // Take first value or set empty string
            }

            // Only update fields present in the request body
            const updatedPreference = await PreferenceModel.findOneAndUpdate(
                { userId: objectId },
                { $set: { gender, ...preferences } },
                { new: true, upsert: true }
            );

            return res.status(200).json({
                message: "Preferences updated successfully",
                preference: updatedPreference
            });

        } catch (error) {
            console.error("❌ Error updating preferences:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    
    async getPreference(req, res) {
        try {
            console.log("Query params:", req.query);
            const { userId } = req.query; // Extract from query parameters
            console.log("User ID:", userId);
    
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
    
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format" });
            }
    
            const objectId = new mongoose.Types.ObjectId(userId);
    
            // Fetch user preferences
            const preferences = await PreferenceModel.findOne({ userId: objectId });
    
            if (!preferences) {
                return res.status(404).json({ message: "Preferences not found" });
            }
    
            return res.status(200).json({
                message: "Preferences retrieved successfully",
                preference: preferences, // Fix: Send correct key
            });
    
        } catch (error) {
            console.error("❌ Error fetching preferences:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async matchPreference(req, res) {
        try {
            console.log("Query params:", req.query);
            const { cur, view } = req.query;
    
            console.log("User ID:", cur, view);
    
            if (!cur) {
                return res.status(400).json({ message: "Current user ID is required" });
            }
            if (!view) {
                return res.status(400).json({ message: "User ID of the profile you are viewing is required" });
            }
    
            if (!mongoose.Types.ObjectId.isValid(cur) || !mongoose.Types.ObjectId.isValid(view)) {
                return res.status(400).json({ message: "Invalid User ID format" });
            }
    
            // Convert string IDs to ObjectId
            const curObjectId = new mongoose.Types.ObjectId(cur);
            const viewObjectId = new mongoose.Types.ObjectId(view);
    
            // Fetch user preferences
            const preferencesbef = await PreferenceModel.findOne({ userId: viewObjectId });
            if (!preferencesbef) {
                return res.status(404).json({ message: "Preferences not found" });
            }
    
            const userdetails = await Person.findOne({ userId: curObjectId });
            if (!userdetails) {
                return res.status(404).json({ message: "User details not found" });
            }
    
            // Define `matches` logic here if needed
            const preference={}
            const {ageRange,gender,religion,caste,subcaste,motherTongue,eatingHabits,education,employed,occupation,annualIncome,location,height,maritalStatus,familyStatus,familyType,familyValues,physicalStatus }=preferencesbef;
            const userdets={
                age:userdetails.age,
                gender:userdetails.gender,
                religion:userdetails.religion,
                caste: userdetails.caste,
                subCaste: userdetails.subCaste ,
                motherTongue: userdetails.motherTongue,
                eatingHabits:userdetails.eatingHabits,               
                highestEducation: userdetails.professionalDetails.highestEducation,
                employed:userdetails.professionalDetails.employed,
                occupation:userdetails.professionalDetails.occupation,
                annualIncome:userdetails.professionalDetails.annualIncome,
                state: userdetails.professionalDetails.state,
                maritalStatus: userdetails.familyDetails.maritalStatus,
                height: {
                    feet: userdetails.familyDetails.height.feet,
                    inches:userdetails.familyDetails.height.inches,
                },
                familyStatus:userdetails.familyDetails.familyStatus,
                familyType:userdetails.familyDetails.familyType,
                familyValues:userdetails.familyDetails.familyValues,
                anyDisability:userdetails.familyDetails.anyDisability,
            };
            const matches=[
                {label:"Prefered Age",  value: `${ageRange[0]},${ageRange[1]}`   ,  match:"red"}, //0
                {label:"Prefered gender" ,  value:  gender.split(",")  ,   match:"red"}, //1
                {label:"Prefered religion",  value:  religion   ,   match:"red" }, //2
                {label:"Prefered caste" ,  value: caste.split(",")   , match:"red"},   //3
                {label:"Prefered subCaste" ,  value:  subcaste.split(",")    ,  match:"red"},  //4
                {label:"Prefered motherTongue" ,  value:  motherTongue   ,  match:"red"},   //5
                {label:"Prefered eatingHabits"  ,  value: eatingHabits   ,  match:"red" },  //6
                {label:"Prefered highestEducation",  value:  education   ,  match:"red"  }, //7
                {label:"Prefered employed" ,  value:  employed   ,  match:"red" },  //8
                {label:"Prefered occupation"  ,  value:  occupation    ,  match:"red" },    //9
                {label:"Prefered annualIncome" ,  value:  annualIncome   ,  match:"red" },  //10
                {label:"Prefered state" ,  value: location    ,  match:"red"},  //11
                {label:"Prefered maritalStatus",  value:  maritalStatus    ,  match:""},    //12
                {label:"Prefered height"  ,  value:  `${height[0].feet}ft ${height[0].inches}in , ${height[1].feet}ft ${height[1].inches}in`    ,  match:"red"}, //13
                {label:"Prefered familyStatus" ,  value:  familyStatus    ,  match:"red"}, //14
                {label:"Prefered familyType"   ,  value:  familyType   ,  match:"red" }, //15
                {label:"Prefered familyValues" ,  value:   familyValues   ,  match:"red"},  //16
                {label:"Prefered physical state"  ,  value:   physicalStatus    ,  match:"red"}, //17

            ];
            
            const arr=[userdets.age,userdets.gender,userdets.religion,userdets.caste,userdets.subCaste,userdets.motherTongue,userdets.eatingHabits,userdets.highestEducation,userdets.employed,userdets.occupation,userdets.annualIncome,userdets.state,userdets.maritalStatus,userdets.height,userdets.familyStatus,userdets.familyType,userdets.familyValues,userdets.anyDisability]
            
            if(Number.parseInt(userdets.age)<=ageRange[1] && Number.parseInt(userdets.age)>=ageRange[0]){
                matches[0].match="green";
            }

            const userTotalInches = userdets.height.feet * 12 + userdets.height.inches;
            const minTotalInches = height[0].feet * 12 + height[0].inches;
            const maxTotalInches = height[1].feet * 12 + height[1].inches;
            // console.log(userTotalInches,minTotalInches,maxTotalInches)
            if(userTotalInches >= minTotalInches && userTotalInches <= maxTotalInches){
                matches[13].match="green";
                // console.log(matches[14].match)
            }
            console.log("Gender")
            console.log(matches)
            if((userdets.gender==="Male"&&gender==="Groom")||(userdets.gender==="Female"&&gender==="Bride")){
                console.log("Gender")
                matches[1].match="green";
                console.log(matches)
            }

            let count=0; 
            matches.forEach(match => {
                if (match.label !== "Preferred Age" && match.label !== "Preferred Height" && match.label !=="Prefered gender" && match.label!=="Prefered annualIncome") {
                    const { value, userValue } = match;
                    
                    if (Array.isArray(value)) {
                        console.log("value",arr[count]);
                        if(value.includes("Any")||value.includes(arr[count])){
                            
                            match.match="green"
                        }
                        else{
                            match.match="red"
                        }
                        console.log(match.label,count)
                    } 
                }
                count++;
            });
                
            return res.status(200).json({
                message: "Preferences retrieved successfully",
                preference: preferencesbef,
                userdt:userdets,
                matches: matches, // Fix: Define or remove this variable
            });
    
        } catch (error) {
            console.error("❌ Error fetching preferences:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    
}

// Initialize preference controller
const preferenceController = new PreferenceController();

module.exports = preferenceController;
