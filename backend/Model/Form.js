const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the logged-in user
  name: { type: String, required: true },
  dob: { type: String, required: true },
  age:{type:String},
  gender:{type:String,required:true},
  religion: { type: String, required: true },
  caste: { type: String, required: true },
  subCaste: { type: String },
  motherTongue: { type: String },

  // ✅ Profile Bio & Image Storage
  bio: { type: String, maxlength: 200 }, // Limit bio length to 200 characters
  image: { type: String }, // Store Base64 image string
   

  professionalDetails: {
    highestEducation: { type: String },
    employed: { type: String },
    occupation: { type: String },
    annualIncome: { type: String },
    workLocation: { type: String },
    state: { type: String },
    country: { type: String },
  },

  familyDetails: {
    maritalStatus: { type: String },
    height: {
      feet: { type: Number },
      inches: { type: Number },
    },
    familyStatus: { type: String },
    familyType: { type: String },
    familyValues: { type: String },
    anyDisability: { type: String, default: "None" },
  },
  Mbti: {
    res: { type: String }, // Ensures MBTI type is a string
    values: { type: [Number]} // Ensures `values` is an array of numbers
  },
});


 const Person= mongoose.model("Person", personSchema);
 module.exports=Person;
