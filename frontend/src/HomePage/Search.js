import React, { useState } from "react";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Typography, Checkbox } from "@mui/material";
import Navbar from "./Navbar";
const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    lookingFor: "Bride",
    ageMin: "",
    ageMax: "",
    heightMin: "",
    heightMax: "",
    maritalStatus: "",
    haveChildren: "Doesn't Matter",
    religion: "",
    motherTongue: "",
    country: "",
    visibleToAll: false,
    protectedPhoto: false,
  });

  const handleChange = (event) => {
    setSearchParams({ ...searchParams, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
        <Navbar />
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, maxWidth: 500, mx: "auto",marginTop:3 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>Search Profiles</Typography>

      {/* Looking For */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body1">Looking for:</Typography>
        <RadioGroup row name="lookingFor" value={searchParams.lookingFor} onChange={handleChange}>
          <FormControlLabel value="Bride" control={<Radio />} label="Bride" />
          <FormControlLabel value="Groom" control={<Radio />} label="Groom" />
        </RadioGroup>
      </FormControl>

      {/* Age Range */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          {/* <InputLabel>Min Age</InputLabel> */}
          <Select name="ageMin" value={searchParams.ageMin} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Min Age</MenuItem>
            {[...Array(41)].map((_, i) => (
              <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          {/* <InputLabel>Max Age</InputLabel> */}
          <Select name="ageMax" value={searchParams.ageMax} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Max Age</MenuItem>
            {[...Array(41)].map((_, i) => (
              <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Height Range */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          {/* <InputLabel>Min Height</InputLabel> */}
          <Select name="heightMin" value={searchParams.heightMin} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Min Height</MenuItem>
            <MenuItem value="134cm">4'5" - 134cm</MenuItem>
            <MenuItem value="140cm">4'7" - 140cm</MenuItem>
            <MenuItem value="150cm">4'11" - 150cm</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          {/* <InputLabel>Max Height</InputLabel> */}
          <Select name="heightMax" value={searchParams.heightMax} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>Select Max Height</MenuItem>
            <MenuItem value="170cm">5'7" - 170cm</MenuItem>
            <MenuItem value="180cm">5'11" - 180cm</MenuItem>
            <MenuItem value="213cm">7' - 213cm</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Marital Status */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        {/* <InputLabel>Marital Status</InputLabel> */}
        <Select name="maritalStatus" value={searchParams.maritalStatus} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Marital Status</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
        </Select>
      </FormControl>

      {/* Have Children */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body1">Have Children:</Typography>
        <RadioGroup row name="haveChildren" value={searchParams.haveChildren} onChange={handleChange}>
          <FormControlLabel value="Doesn't Matter" control={<Radio />} label="Doesn't Matter" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {/* Religion */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        {/* <InputLabel>Religion</InputLabel> */}
        <Select name="religion" value={searchParams.religion} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Religion</MenuItem>
          <MenuItem value="Hindu">Hindu</MenuItem>
          <MenuItem value="Muslim">Muslim</MenuItem>
          <MenuItem value="Christian">Christian</MenuItem>
        </Select>
      </FormControl>

      {/* Mother Tongue */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        {/* <InputLabel>Mother Tongue</InputLabel> */}
        <Select name="motherTongue" value={searchParams.motherTongue} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Mother Tongue</MenuItem>
          <MenuItem value="Telugu">Telugu</MenuItem>
          <MenuItem value="Hindi">Hindi</MenuItem>
        </Select>
      </FormControl>

      {/* Country */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        {/* <InputLabel>Country Living In</InputLabel> */}
        <Select name="country" value={searchParams.country} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Select Country</MenuItem>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </Select>
      </FormControl>

      {/* Search Button */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="primary" sx={{ px: 4 }}>Search</Button>
        <Button variant="outlined" color="secondary" onClick={() => setSearchParams({
          lookingFor: "Bride",
          ageMin: "",
          ageMax: "",
          heightMin: "",
          heightMax: "",
          maritalStatus: "",
          haveChildren: "Doesn't Matter",
          religion: "",
          motherTongue: "",
          country: "",
        })}>Reset</Button>
      </Box>
    </Box>
    </Box>
  );
};

export default SearchForm;
