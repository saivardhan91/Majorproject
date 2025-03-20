import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
const ProfessionalDetailsForm = () => {
  const auth =useAuth();
  const [formData, setFormData] = useState({
    userId:auth.user.id,
    highestEducation: "",
    employed: "",
    occupation: "",
    annualIncome: "",
    workLocation: "",
    state: "",
    country: "",
  });
  const education=["Primary School (1st - 5th grade)",
      "Middle School (6th - 8th grade)",
      "High School (9th - 10th grade)",
      "Higher Secondary - Science (Physics, Chemistry, Mathematics, Biology)",
      "Higher Secondary - Commerce (Accountancy, Economics, Business Studies)",
      "Higher Secondary - Arts / Humanities (History, Political Science, Sociology)",
      "Higher Secondary - Vocational (Hotel Management, IT, Automobile)",
      "Diploma in Engineering (Polytechnic)",
      "Diploma in Nursing",
      "Diploma in Education (D.Ed.)",
      "Diploma in Hotel Management",
      "Diploma in Computer Applications (DCA)",
      "Diploma in Pharmacy (D.Pharm)",
      "ITI (Industrial Training Institute)",
      "Vocational Training Certificates",
      "Bachelor of Arts (BA)",
      "Bachelor of Social Work (BSW)",
      "Bachelor of Science (BSc)",
      "Bachelor of Computer Applications (BCA)",
      "Bachelor of Commerce (BCom)",
      "Bachelor of Business Administration (BBA)",
      "Bachelor of Engineering (BE)",
      "Bachelor of Technology (BTech)",
      "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
      "Bachelor of Dental Surgery (BDS)",
      "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
      "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
      "Bachelor of Pharmacy (B.Pharm)",
      "Bachelor of Laws (LLB)",
      "Bachelor of Fine Arts (BFA)",
      "Bachelor of Journalism & Mass Communication (BJMC)",
      "Master of Arts (MA)",
      "Master of Social Work (MSW)",
      "Master of Science (MSc)",
      "Master of Computer Applications (MCA)",
      "Master of Commerce (MCom)",
      "Master of Business Administration (MBA)",
      "Master of Engineering (ME)",
      "Master of Technology (MTech)",
      "Doctor of Medicine (MD)",
      "Master of Surgery (MS)",
      "Master of Pharmacy (MPharm)",
      "Master of Laws (LLM)",
      "Master of Fine Arts (MFA)",
      "Master of Journalism & Mass Communication (MJMC)",
      "Doctor of Philosophy (PhD)",
      "Doctor of Science (DSc)",
      "Doctor of Literature (DLitt)",
      "Doctor of Medicine (DM)",
      "Master of Chirurgiae (MCh)",
      "Doctor of Law (LLD)",
      "Chartered Accountant (CA)",
      "Company Secretary (CS)",
      "Cost and Management Accountant (CMA)",
      "Certified Financial Planner (CFP)"]
  const salary=["Less than Rs.50 thousand", "Rs.50 thousand", "Rs.1 Lakh", "Rs.2 Lakhs", "Rs.3 Lakhs", "Rs.4 Lakhs", "Rs.5 Lakhs", "Rs.6 Lakhs", "Rs.7 Lakhs", "Rs.8 Lakhs", "Rs.9 Lakhs", "Rs.10 Lakhs", "Rs.12 Lakhs", "Rs.14 Lakhs", "Rs.16 Lakhs", "Rs.18 Lakhs", "Rs.20 Lakhs", "Rs.25 Lakhs", "Rs.30 Lakhs", "Rs.35 Lakhs", "Rs.40 Lakhs", "Rs.45 Lakhs", "Rs.50 Lakhs", "Rs.60 Lakhs", "Rs.70 Lakhs", "Rs.80 Lakhs", "Rs.90 Lakhs", "Rs.1 Crore", "Rs.1 Crore & Above"]
  const location= [
    "Any",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", 
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
  ]
  const navigate=useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmploymentChange = (event, newEmployed) => {
    if (newEmployed !== null) {
      setFormData({ ...formData, employed: newEmployed });
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const res= await axios.post('http://localhost:5000/update-professional',formData);
    console.log(res.data);
    navigate('/register/PhotoDetails');
    console.log("Professional Details:", formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(243, 182, 162)", // Background color covering full screen
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: 400,
          padding: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          Professional Details
        </Typography>

        {/* Highest Education */}
        <FormControl fullWidth>
        <Select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            displayEmpty
        >
            <MenuItem value="" disabled>Select Highest Education</MenuItem>
            {
              education.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))
            }
        </Select>
        </FormControl>


        {/* Employed In */}
        <Typography variant="subtitle1">Employed In</Typography>
<ToggleButtonGroup
  color="primary"
  value={formData.employed}
  exclusive
  onChange={handleEmploymentChange}
  sx={{ flexWrap: "wrap", gap: "5px" }} // Ensures buttons wrap when needed
>
  <ToggleButton value="Government">Govt/PSU</ToggleButton>
  <ToggleButton value="Private">Private</ToggleButton>
  <ToggleButton value="Business">Business</ToggleButton>
  <ToggleButton value="Defence">Defence</ToggleButton>
  <ToggleButton value="Self Employed">Self Employed</ToggleButton>
  <ToggleButton value="Not Working">Not Working</ToggleButton>
</ToggleButtonGroup>



        {/* Occupation */}
        <TextField
          fullWidth
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        />

        {/* Annual Income */}
        <FormControl fullWidth>
        <Select
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            displayEmpty
        >
            <MenuItem value="" disabled>Select Annual Income</MenuItem>
            {
              salary.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))
            }
        </Select>
        </FormControl>


        {/* Work Location */}
        <TextField
          fullWidth
          label="Work Location"
          name="workLocation"
          value={formData.workLocation}
          onChange={handleChange}
        />

        {/* State */}
        <FormControl fullWidth>
        <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            displayEmpty
        >
            <MenuItem value="" disabled>State</MenuItem>
            {
              location.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))
            }
        </Select>
        </FormControl>

        {/* City */}
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formData.city}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            fontSize: "16px",
            padding: "10px",
            borderRadius: "20px",
            backgroundColor: "#ff6f00",
            "&:hover": { backgroundColor: "#e65100" },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ProfessionalDetailsForm;
