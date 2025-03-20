const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  ageRange: { type: [Number], default: [] },
  gender: { type: String, enum: ["Groom", "Bride"], default: null },
  religion: { type: [String], default: [] },
  caste: { type: String, default: null },
  subcaste: { type: String, default: null },
  motherTongue: { type: [String], default: [] },
  eatingHabits: { type: [String], default: [] },
  
  education: { type: [String], default: [] },
  employed: { type: [String], default: [] },
  occupation: { type: [String], default: [] },
  annualIncome: { type: [String], default: [] },
  location: { type: [String], default: [] },

  height: { type: [Object], default: [] },
  maritalStatus: { type: [String], default: [] },  
  familyStatus:{ type: [String], default: [] },
  familyType:{ type: [String], default: [] },
  familyValues:{ type: [String], default: [] },
  physicalStatus: { type: [String], default: [] },
  
}, { timestamps: true });

module.exports = mongoose.model("preference", preferenceSchema);
