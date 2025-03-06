const express = require("express");
const Person = require("../Model/Form");

const router = express.Router();

class FormController {
  async normalDetails(req, res)  {
    try {
        const { userId, name, dob,age,gender, religion, caste, subCaste, motherTongue } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        let person = await Person.findOne({ userId });

        if (!person) {
            person = new Person({ userId, name, dob,age,gender, religion, caste, subCaste, motherTongue });
        } else {
            person.name = name;
            person.dob = dob;
            person.age=age;
            person.gender=gender;
            person.religion = religion;
            person.caste = caste;
            person.subCaste = subCaste;
            person.motherTongue = motherTongue;
        }

        await person.save();
        res.status(200).json({ message: "Normal details saved successfully", person });
    } catch (error) {
        console.error("Error saving normal details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async professionalDetails(req, res)  {
  try {
      const { userId, highestEducation, employed, occupation, annualIncome, workLocation, state, country } = req.body;
console.log(highestEducation);
      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      let person = await Person.findOne({ userId });

      if (!person) {
          return res.status(404).json({ error: "User not found" });
      }

      person.professionalDetails = {
          highestEducation: highestEducation || person.professionalDetails.highestEducation,
          employed: employed || person.professionalDetails.employed,
          occupation: occupation || person.professionalDetails.occupation,
          annualIncome: annualIncome || person.professionalDetails.annualIncome,
          workLocation: workLocation || person.professionalDetails.workLocation,
          state: state || person.professionalDetails.state,
          country: country || person.professionalDetails.country,
      };

      await person.save();
      res.status(200).json({ message: "Professional details updated successfully", professionalDetails: person.professionalDetails });

  } catch (error) {
      console.error("Error updating professional details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

async familyDetails(req, res)  {
  try {
      const { userId, maritalStatus, heightFeet,heightInches, familyStatus, familyType, familyValues, anyDisability } = req.body;
      // console.log(heightFeet);
      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      let person = await Person.findOne({ userId });

      if (!person) {
          return res.status(404).json({ error: "User not found" });
      }

      person.familyDetails = {
          maritalStatus: maritalStatus || person.familyDetails.maritalStatus,
          height: {
              feet: heightFeet || person.familyDetails?.heightFeet,
              inches: heightInches || person.familyDetails?.heightInches,
          },
          familyStatus: familyStatus || person.familyDetails.familyStatus,
          familyType: familyType || person.familyDetails.familyType,
          familyValues: familyValues || person.familyDetails.familyValues,
          anyDisability: anyDisability || person.familyDetails.anyDisability,
      };

      await person.save();
      res.status(200).json({ message: "Family details updated successfully", familyDetails: person.familyDetails });

  } catch (error) {
      console.error("Error updating family details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}
async ProfileImage(req, res)  {
    try {
      const { userId, bio, image } = req.body; // Extract data from request
  
      // Check if profile already exists
      let person = await Person.findOne({ userId });
  
      if (person) {
        // Update existing profile
        person.bio = bio;
        person.image = image; // Store Base64 Image
      } else {
        // Create a new profile
        person = new Person({
          userId,
          bio,
          image, // Store Base64 Image
        });
      }
  
      await person.save();
      res.status(201).json({ message: "Profile saved successfully", person });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving profile" });
    }
  }
  
  //MBTI result
  async mbtiResult(req, res) {
    try {
        const { user, mbti } = req.body; // Extract the correct fields from request body

        if (!user) {
            return res.status(400).json({ error: "User ID is required" });
        }

        let person = await Person.findOne({ userId: user });

        if (!person) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log(mbti);
        // Update the MBTI result
        person.Mbti = {
            res: mbti.res,
            values: mbti.scores, // Correcting key name to match schema
        };

        await person.save();
        res.status(200).json({ message: "MBTI result updated successfully" });
      } catch (error) {
          console.error("Error saving MBTI result:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  }
      
      // Get form data for a specific user
      async getForm (req, res)  {
        try {
          console.log("get form")
          const { userId } = req.params;
          console.log(userId);
          const person = await Person.findOne({ userId });
          console.log(person);
          if (!person) {
            return res.status(404).json({ message: "No data found for this user" });
          }
          
          res.status(200).json({ data: person });
        } catch (error) {
          console.error("Error fetching form data:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      
      }
}

module.exports = new FormController();

