import React, { useState } from "react";
import {
  Box, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, RadioGroup, FormControlLabel, Radio, Typography
} from "@mui/material";
import Navbar from "./Navbar";

const SearchForm = () => {
  const [searchType, setSearchType] = useState("profiles"); // "profiles" (default) or "profile"
  const [profileSuggestions, setProfileSuggestions] = useState([]); // Suggestions for Profile Search
  const [searchParams, setSearchParams] = useState({
    lookingFor: "Bride",
    ageMin: "",
    ageMax: "",
    heightMin: "",
    heightMax: "",
    maritalStatus: "",
    haveChildren: "No",
    religion: "",
    caste: "", // Added Caste Field
    motherTongue: "",
    country: "",
    profileId: "",
  });

  // Handle Input Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });

    // Fetch profile suggestions dynamically (Mock example)
    if (name === "profileId") {
      setProfileSuggestions(
        ["P1234", "P5678", "P91011"].filter((id) => id.includes(value))
      );
    }
  };

  // Reset Form
  const handleReset = () => {
    setSearchParams({
      lookingFor: "Bride",
      ageMin: "",
      ageMax: "",
      heightMin: "",
      heightMax: "",
      maritalStatus: "",
      haveChildren: "No",
      religion: "",
      caste: "", // Reset Caste Field
      motherTongue: "",
      country: "",
      profileId: "",
    });
    setProfileSuggestions([]);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, maxWidth: 500, mx: "auto", marginTop: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
          Search Profiles
        </Typography>

        {/* Search Type Selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body1">Search Type:</Typography>
          <RadioGroup row value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <FormControlLabel value="profile" control={<Radio />} label="Profile Search" />
            <FormControlLabel value="profiles" control={<Radio />} label="Profiles Search" />
          </RadioGroup>
        </FormControl>

        {/* Profile Search (by ID) */}
        {searchType === "profile" ? (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Profile ID"
              name="profileId"
              value={searchParams.profileId}
              onChange={handleChange}
            />
            {profileSuggestions.length > 0 && (
              <Box sx={{ bgcolor: "#f1f1f1", mt: 1, p: 1, borderRadius: 1 }}>
                {profileSuggestions.map((suggestion) => (
                  <Typography
                    key={suggestion}
                    sx={{ cursor: "pointer", "&:hover": { bgcolor: "#ddd" }, p: 1 }}
                    onClick={() => setSearchParams({ ...searchParams, profileId: suggestion })}
                  >
                    {suggestion}
                  </Typography>
                ))}
              </Box>
            )}
          </FormControl>
        ) : (
          <>
            {/* Looking for Bride/Groom */}
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
                <InputLabel>Min Age</InputLabel>
                <Select name="ageMin" value={searchParams.ageMin} onChange={handleChange}>
                  {[...Array(41)].map((_, i) => (
                    <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Max Age</InputLabel>
                <Select name="ageMax" value={searchParams.ageMax} onChange={handleChange}>
                  {[...Array(41)].map((_, i) => (
                    <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Marital Status */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Marital Status</InputLabel>
              <Select name="maritalStatus" value={searchParams.maritalStatus} onChange={handleChange}>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
              </Select>
            </FormControl>

            {/* Religion */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Religion</InputLabel>
              <Select name="religion" value={searchParams.religion} onChange={handleChange}>
                <MenuItem value="Hindu">Hindu</MenuItem>
                <MenuItem value="Muslim">Muslim</MenuItem>
                <MenuItem value="Christian">Christian</MenuItem>
              </Select>
            </FormControl>

            {/* Caste (Added) */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Caste"
                name="caste"
                value={searchParams.caste}
                onChange={handleChange}
              />
            </FormControl>

            {/* Country */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Country"
                name="country"
                value={searchParams.country}
                onChange={handleChange}
              />
            </FormControl>
          </>
        )}

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ px: 4 }}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchForm;
