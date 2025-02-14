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
            <MenuItem value="B.Tech">B.Tech</MenuItem>
            <MenuItem value="M.Tech">M.Tech</MenuItem>
            <MenuItem value="MBA">MBA</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
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
            <MenuItem value="3 - 5 Lakhs">3 - 5 Lakhs</MenuItem>
            <MenuItem value="6 - 7 Lakhs">6 - 7 Lakhs</MenuItem>
            <MenuItem value="8 - 10 Lakhs">8 - 10 Lakhs</MenuItem>
            <MenuItem value="10+ Lakhs">10+ Lakhs</MenuItem>
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
        <TextField
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

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
