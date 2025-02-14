import React, { useState } from "react";
import { Container, Typography, TextField, MenuItem, Button, Box } from "@mui/material";
import Navbar from "./Navbar";

const GroomBridePreferences = () => {
  const [preferences, setPreferences] = useState({
    gender: "",
    ageRange: "",
    height: "",
    religion: "",
    education: "",
    profession: "",
    location: "",
  });

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Preferences Submitted:", preferences);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", backgroundColor:"white"}}>
      <Navbar />
      
        <Container maxWidth="sm" sx={{mt:2}}>
        <Box backgroundColor="white"  p={2} borderRadius={2} boxShadow={2}>
          <Typography variant="h5" gutterBottom>
            Groom/Bride Preferences
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField select label="Gender" name="gender" value={preferences.gender} onChange={handleChange}>
              <MenuItem value="Groom">Groom</MenuItem>
              <MenuItem value="Bride">Bride</MenuItem>
            </TextField>
            <TextField label="Age Range" name="ageRange" value={preferences.ageRange} onChange={handleChange} placeholder="e.g., 25-30" />
            <TextField label="Height Preference" name="height" value={preferences.height} onChange={handleChange} placeholder="e.g., 5'5'' - 6'0''" />
            <TextField label="Religion" name="religion" value={preferences.religion} onChange={handleChange} />
            <TextField label="Highest Education" name="education" value={preferences.education} onChange={handleChange} />
            <TextField label="Profession" name="profession" value={preferences.profession} onChange={handleChange} />
            <TextField label="Preferred Location" name="location" value={preferences.location} onChange={handleChange} />
            <Button variant="contained" color="primary" type="submit">
              Submit Preferences
            </Button>
          </Box>
          </Box>
        </Container>
      </Box>
    
  );
};

export default GroomBridePreferences;