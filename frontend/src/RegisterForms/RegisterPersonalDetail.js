import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, Button, Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";
const AboutForm = () => {
  const auth =useAuth();
  const [formData, setFormData] = useState({
    userId:auth.user.id,
    maritalStatus: "",
    heightFeet: "",
    heightInches: "",
    familyStatus: "",
    familyType: "",
    familyValues: "",
    anyDisability: "None",
  });
  const navigate=useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res= await axios.post('http://localhost:5000/FamilyDetails',formData);
    console.log(res.data);
    navigate('/register/ProfessionalDetails');
    console.log("Form Submitted:", formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(243, 182, 162)",
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
          width: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          Tell Us About Yourself
        </Typography>

        <FormControl fullWidth>
          <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Marital Status</MenuItem>
            <MenuItem value="Never Married">Single</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Awaiting Divorce">Awaiting Divorce</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl fullWidth>
        <Select name="heightFeet" value={formData.heightFeet || ""} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Feet</MenuItem>
          {[...Array(8)].map((_, i) => (
            <MenuItem key={i} value={i + 3}>{i + 3} ft</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Select name="heightInches" value={formData.heightInches || ""} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Inches</MenuItem>
          {[...Array(12)].map((_, i) => (
            <MenuItem key={i} value={i}>{i} in</MenuItem>
          ))}
        </Select>
      </FormControl>
        </Box>

        <FormControl fullWidth>
          <Select name="familyStatus" value={formData.familyStatus} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Family Status</MenuItem>
            <MenuItem value="Middle Class">Middle Class</MenuItem>
            <MenuItem value="Upper Middle Class">Upper Middle Class</MenuItem>
            <MenuItem value="High Class">High Class</MenuItem>
            <MenuItem value="Rich/Affluent">Rich/Affluent</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Select name="familyType" value={formData.familyType} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Family Type</MenuItem>
            <MenuItem value="Joint">Joint</MenuItem>
            <MenuItem value="Nuclear">Nuclear</MenuItem>
            <MenuItem value="Extended">Extended</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Select name="familyValues" value={formData.familyValues} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Family Values</MenuItem>
            <MenuItem value="Orthodox">Orthodox</MenuItem>
            <MenuItem value="Traditional">Traditional</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Liberal">Liberal</MenuItem>
          </Select>
        </FormControl>

        <Typography sx={{ fontWeight: "bold" }}>Any Disability</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          value={formData.anyDisability}
          onChange={(event, newValue) => setFormData((prev) => ({ ...prev, anyDisability: newValue }))}
        >
          <ToggleButton value="None">None</ToggleButton>
          <ToggleButton value="Physically Challenged">Physically Challenged</ToggleButton>
        </ToggleButtonGroup>

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

export default AboutForm;
