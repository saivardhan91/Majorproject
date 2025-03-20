const mongoose = require("mongoose");

const shortlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Logged-in user who is shortlisting
  shortlistedProfiles: [
    {
      profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Person", required: true }, // Shortlisted profile
      shortlistedAt: { type: Date, default: Date.now }, // Timestamp when added
    },
  ],
});

const Shortlist = mongoose.model("Shortlist", shortlistSchema);
module.exports = Shortlist;