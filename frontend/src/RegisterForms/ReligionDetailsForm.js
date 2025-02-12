import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";
const FormComponent = () => {
  const auth=useAuth();
  console.log(auth);
  const [formData, setFormData] = useState({
    userId:auth.user.id,
    name:auth.user.name,
    dob: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
  });
 const navigate =useNavigate();
  const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Others"];
  const motherTongues = ["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Others"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res= await axios.post('http://localhost:5000/submit-form',formData);
    console.log(res.data);
    navigate('/register/RegisterPersonalDetails');
    console.log("Form Submitted:", formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(243, 182, 162)", // Apply background color to full screen
        minHeight: "100vh", // Ensure it covers the full viewport height
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
          gap: 2,
          width: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          Please Provide Your Basic Details
        </Typography>

        <TextField
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <FormControl fullWidth>
         
          <Select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            displayEmpty
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>Select Religion</MenuItem>
            {religions.map((religion) => (
              <MenuItem key={religion} value={religion}>{religion}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Caste" name="caste" value={formData.caste} onChange={handleChange} fullWidth />
        <TextField label="Sub Caste" name="subCaste" value={formData.subCaste} onChange={handleChange} fullWidth />

        <FormControl fullWidth>
          
          <Select
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            displayEmpty
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>Select Mother Tongue</MenuItem>
            {motherTongues.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontSize: "16px", padding: "10px", borderRadius: "20px", backgroundColor: "#ff6f00", "&:hover": { backgroundColor: "#e65100" } }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default FormComponent;
