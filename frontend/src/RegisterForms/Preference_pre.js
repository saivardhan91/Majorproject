import React, { useEffect, useState } from "react";
import { Typography, FormControl, MenuItem, Checkbox, ListItemText, Button, Box, Divider, TextField, Select,Paper } from "@mui/material";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreferencePre = () => {
    const auth=useAuth();
    const navigate=useNavigate();
    const [preferences, setPreferences] = useState({
      userId:auth?.user?.id,
      gender: auth?.user?.gender==="Male" ? "Bride":"Groom",
      ageRange: [],
      height: [],
      maritalStatus: [],
      motherTongue: [],
      physicalStatus: [],
      eatingHabits: [],
      religion: [],
      caste: "",
      subcaste: "",
      familyStatus:[],
    familyType:[],
    familyValues:[],
      education: [],
      occupation: [],
      employed: [],
      annualIncome: "",
      location: [],
    });
    console.log(auth.user.gender)
    const options = {
      gender: ["Groom", "Bride"],
      ageRange: ["18-22", "23-27", "28-32", "33-40"],
      height: ["Any","5'0'' - 5'5''", "5'6'' - 6'0''", "6'1'' - 6'5''"],
      maritalStatus: [
        "Any",
        "Never Married",
        "Widowed",
        "Divorced",
        "Awaiting Divorce"
      ],
      motherTongue: [
        "Any", "Angika", "Arunachali", "Assamese", "Awadhi", "Bengali", "Bhojpuri", "Brij", "Bihari", "Badaga", "Chatisgarhi", "Dogri", "English", "French", "Garhwali", "Garo", "Gujarati", "Haryanvi", "Himachali/Pahari", "Hindi", "Kanauji", "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni", "Kutchi", "Lepcha", "Ladacki", "Magahi", "Maithili", "Malayalam", "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nicobarese", "Nepali", "Oriya", "Punjabi", "Rajasthani", "Sanskrit", "Santhali", "Sindhi", "Sourashtra", "Tamil", "Telugu", "Tripuri", "Tulu", "Urdu", "Bagri Rajasthani", "Dhundhari/Jaipuri", "Gujari/Gojari", "Harauti", "Lambadi", "Malvi", "Mewari", "Mewati/Ahirwati", "Nimadi", "Shekhawati", "Wagdi"
      ],
      physicalStatus: ["Any","None", "Physically challenged"],
      eatingHabits: ["Any", "Vegetarian", "Non Vegetarian"],
      religion: ["Any","Hindu", "Muslim", "Christian", "Sikh", "Others"],
      familyStatus:["Any","Middle Class","Upper Middle Class","High Class","Rich/Affluent"],
    familyType:["Any","Nuclear", "Joint", "Extended"],
    familyValues:["Any","Orthodox","Traditional","Moderate","Liberal"],
      education: [
        "Any",
        "Primary School (1st - 5th grade)",
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
        "Certified Financial Planner (CFP)"
      ],
      occupation: ["Any", "Administration", "Agriculture", "Airline", "Architecture & design", "Banking & finance", "Beauty & fashion", "BPO & customer service", "Civil services", "Corporate professionals", "Defence", "Doctor", "Education & training", "Engineering", "Hospitality", "IT & software", "Legal", "Media & entertainment", "Medical & healthcare-others", "Merchant navy", "Others", "Police / law enforcement", "Scientist", "Senior management"],
      employed: ["Any", "Private", "Government/PSU", "Business", "Defence", "Self Employed", "Not Working"],
      annualIncome: ["Less than Rs.50 thousand", "Rs.50 thousand", "Rs.1 Lakh", "Rs.2 Lakhs", "Rs.3 Lakhs", "Rs.4 Lakhs", "Rs.5 Lakhs", "Rs.6 Lakhs", "Rs.7 Lakhs", "Rs.8 Lakhs", "Rs.9 Lakhs", "Rs.10 Lakhs", "Rs.12 Lakhs", "Rs.14 Lakhs", "Rs.16 Lakhs", "Rs.18 Lakhs", "Rs.20 Lakhs", "Rs.25 Lakhs", "Rs.30 Lakhs", "Rs.35 Lakhs", "Rs.40 Lakhs", "Rs.45 Lakhs", "Rs.50 Lakhs", "Rs.60 Lakhs", "Rs.70 Lakhs", "Rs.80 Lakhs", "Rs.90 Lakhs", "Rs.1 Crore", "Rs.1 Crore & Above"],
      location: [
        "Any",
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
        "Uttar Pradesh", "Uttarakhand", "West Bengal", 
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
      ],
    };
  
    const handleDropdownChange = (category) => (event) => {
      const value = event.target.value;
      const allOptions = options[category];
      const anyOption = allOptions.find(opt => opt === "Any");
      const regularOptions = allOptions.filter(opt => opt !== "Any");
    
      // If "Any" is being selected
      if (value.includes("Any") && !preferences[category].includes("Any")) {
        setPreferences((prev) => ({
          ...prev,
          [category]: ["Any"],
        }));
      } 
      // If "Any" is being deselected
      else if (!value.includes("Any") && preferences[category].includes("Any")) {
        setPreferences((prev) => ({
          ...prev,
          [category]: [],
        }));
      }
      // If all regular options are selected
      else if (!value.includes("Any") && value.length === regularOptions.length) {
        setPreferences((prev) => ({
          ...prev,
          [category]: ["Any"],
        }));
      }
      // If a regular option is being selected while "Any" is already selected
      else if (value.length > 1 && value.includes("Any")) {
        // Keep only the selected regular options
        const selectedRegularOptions = value.filter(opt => opt !== "Any");
        setPreferences((prev) => ({
          ...prev,
          [category]: selectedRegularOptions,
        }));
      } 
      // Default case: just update with the selected values
      else {
        setPreferences((prev) => ({
          ...prev,
          [category]: value,
        }));
      }
    };

    const handleAgeRangeChange = (index) => (event) => {
      const value = event.target.value;
      setPreferences((prev) => {
        let updatedAgeRange = [...prev.ageRange];
    
        if (index === 0) {
          // If setting Min Age, ensure it does not exceed Max Age
          updatedAgeRange[0] = value;
          if (updatedAgeRange[1] && value > updatedAgeRange[1]) {
            updatedAgeRange[1] = value; // Adjust Max Age to be same as Min Age
          }
        } else {
          // If setting Max Age, ensure it is not less than Min Age
          updatedAgeRange[1] = value;
          if (updatedAgeRange[0] && value < updatedAgeRange[0]) {
            updatedAgeRange[0] = value; // Adjust Min Age to be same as Max Age
          }
        }
    
        return { ...prev, ageRange: updatedAgeRange };
      });
    };
  
    const handleHeightChange = (index, type) => (event) => {
      const value = event.target.value;
      setPreferences((prev) => {
        let updatedHeight = prev.height.length ? [...prev.height] : [{ feet: 5, inches: 0 }, { feet: 6, inches: 0 }];
    
        if (type === "feet") {
          updatedHeight[index] = { ...updatedHeight[index], feet: value };
        } else {
          updatedHeight[index] = { ...updatedHeight[index], inches: value };
        }
    
        // Ensure min height <= max height
        const minHeight = updatedHeight[0].feet * 12 + updatedHeight[0].inches;
        const maxHeight = updatedHeight[1].feet * 12 + updatedHeight[1].inches;
        
        if (minHeight > maxHeight) {
          updatedHeight[1] = { ...updatedHeight[0] }; // Sync max height with min height if invalid
        }
    
        return { ...prev, height: updatedHeight };
      });
    };
    
  
    const handleTextFieldChange = (category) => (event) => {
      const value = event.target.value;
      setPreferences((prev) => ({
        ...prev,
        [category]: value,
      }));
    };


    useEffect(()=>{
      console.log(auth.user.id)
      console.log(auth.user)
    },auth?.user)


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(auth?.user)
      console.log("Preferences Submitted:", preferences);
      updatePreferences(preferences);
      // You can add API call here
    };
    const updatePreferences = async (preferences) => {
      try {
          console.log("Updating preferences:", preferences);
  
          const response = await axios.post("http://localhost:5000/setPreference", preferences);
  
          if (response.status === 200) {
              console.log("✅ Preferences updated successfully:", response.data);
              navigate("/Home")
          } else {
              console.error("⚠️ Error updating preferences:", response.data.message);
          }
      } catch (error) {
          console.error("❌ Request failed:", error.response?.data || error.message);
      }
  };
  
  
    return (
        <Box sx={{ backgroundColor: "#f3b6a2", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ padding: 4, width: 500, borderRadius: 2, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",mt: 4 }}>
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>Groom/Bride Preferences</Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  
  {/* Gender Preference */}
  <Typography variant="h6">Basic Preference</Typography>
  <Divider sx={{ borderBottomWidth: 2 }} />
  <FormControl fullWidth sx={{ mb: 2 }}>
      <Select
          name="gender"
          value={preferences.gender}
          onChange={handleDropdownChange("gender")}
          displayEmpty
      >
          <MenuItem value="" disabled>Select Gender</MenuItem>
          {options.gender.map((option) => (
              <MenuItem key={option} value={option}>
                  {option}
              </MenuItem>
          ))}
      </Select>
  </FormControl>

 <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.ageRange[0]} // Minimum age at index 0
                 onChange={handleAgeRangeChange(0)}
                 renderValue={(selected) =>
                   selected ? selected : <em>Minimum Age</em>
                 }
               >
                 <MenuItem value="" disabled>Minimum Age</MenuItem>
                 {Array.from({ length: 43 }, (_, i) => i + 18).map((option) => (
                   <MenuItem key={option} value={option}>{option}</MenuItem>
                 ))}
               </Select>
             </FormControl>
 
             <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.ageRange[1] || ""} // Maximum age at index 1
                 onChange={handleAgeRangeChange(1)}
                 renderValue={(selected) =>
                   selected ? selected : <em>Maximum Age</em>
                 }
               >
                 <MenuItem value="" disabled>Maximum Age</MenuItem>
                 {Array.from({ length: 43 }, (_, i) => i + 18).map((option) => (
                   <MenuItem key={option} value={option}>{option}</MenuItem>
                 ))}
               </Select>
             </FormControl>
 
             {/* Height Preference */}
             <Box sx={{ display: "flex", gap: 2 }}>
             <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.height[0]?.feet || 5}
                 onChange={handleHeightChange(0, "feet")}
                 renderValue={(selected) =>
                   selected ? `${selected} ft` : <em>Min Height (ft)</em>
                 }
               >
                 <MenuItem value="" disabled>Feet</MenuItem>
                 {Array.from({ length: 3 }, (_, i) => i + 4).map((ft) => ( // Feet range: 4-7
                   <MenuItem key={ft} value={ft}>{ft} ft</MenuItem>
                 ))}
               </Select>
             </FormControl>
 
             <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.height[0]?.inches || 0}
                 onChange={handleHeightChange(0, "inches")}
                 renderValue={(selected) =>
                   selected ? `${selected} in` : <em>Min Height (in)</em>
                 }
               >
                 <MenuItem value="" disabled>Inches</MenuItem>
                 {Array.from({ length: 12 }, (_, i) => i).map((inch) => ( // Inches: 0-11
                   <MenuItem key={inch} value={inch}>{inch} in</MenuItem>
                 ))}
               </Select>
             </FormControl>
           </Box>
 
           {/* Maximum Height Selection */}
           <Box sx={{ display: "flex", gap: 2 }}>
             <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.height[1]?.feet || 6}
                 onChange={handleHeightChange(1, "feet")}
                 renderValue={(selected) =>
                   selected ? `${selected} ft` : <em>Max Height (ft)</em>
                 }
               >
                 <MenuItem value="" disabled>Feet</MenuItem>
                 {Array.from({ length: 3 }, (_, i) => i + 4).map((ft) => ( // Feet range: 4-7
                   <MenuItem key={ft} value={ft}>{ft} ft</MenuItem>
                 ))}
               </Select>
             </FormControl>
 
             <FormControl fullWidth sx={{ mb: 2 }}>
               <Select
                 displayEmpty
                 value={preferences.height[1]?.inches || 0}
                 onChange={handleHeightChange(1, "inches")}
                 renderValue={(selected) =>
                   selected ? `${selected} in` : <em>Max Height (in)</em>
                 }
               >
                 <MenuItem value="" disabled>Inches</MenuItem>
                 {Array.from({ length: 12 }, (_, i) => i).map((inch) => ( // Inches: 0-11
                   <MenuItem key={inch} value={inch}>{inch} in</MenuItem>
                 ))}
               </Select>
             </FormControl>
           </Box>


  {/* Marital Status */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Marital Status</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.maritalStatus}
      onChange={handleDropdownChange("maritalStatus")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Marital Status</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Marital Status</MenuItem>
      {options.maritalStatus.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.maritalStatus.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Mother Tongue */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Mother Tongue</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.motherTongue}
      onChange={handleDropdownChange("motherTongue")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Mother Tongue</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Mother Tongue</MenuItem>
      {options.motherTongue.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.motherTongue.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Physical Status */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Physical Status</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.physicalStatus}
      onChange={handleDropdownChange("physicalStatus")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Physical Status</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Physical Status</MenuItem>
      {options.physicalStatus.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.physicalStatus.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Eating Habits */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Eating Habits</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.eatingHabits}
      onChange={handleDropdownChange("eatingHabits")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Eating Habits</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Eating Habits</MenuItem>
      {options.eatingHabits.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.eatingHabits.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Religion Preference */}
  <Typography variant="h6">Religious Preference</Typography>
  <Divider sx={{ borderBottomWidth: 2 }} />
   <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Religion</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.religion}
      onChange={handleDropdownChange("religion")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Religion</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Religion</MenuItem>
      {options.religion.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.religion.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Caste Input */}
  <TextField
  sx={{mb: 1}}
    fullWidth
    label="Caste"
    name="caste"
    value={preferences.caste}
    onChange={handleTextFieldChange("caste")}
    margin="normal"
  />

  {/* Subcaste Input */}
  <TextField
    fullWidth
    sx={{mb: 1}}
    label="Subcaste"
    name="subcaste"
    value={preferences.subcaste}
    onChange={handleTextFieldChange("subcaste")}
    margin="normal"
  />

  {/* Family Preference */}
              <Typography variant="h6">Family Preference</Typography>
              <Divider sx={{ borderBottomWidth: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                multiple
                displayEmpty
                value={preferences.familyStatus}
                onChange={handleDropdownChange("familyStatus")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Family Status</em> : selected.join(", ")
                }
              >
                <MenuItem value="" disabled>Family Status</MenuItem>
                {options.familyStatus.map((option) => ( // FIXED: Use options.familyStatus
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.familyStatus.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                multiple
                displayEmpty
                value={preferences.familyType}
                onChange={handleDropdownChange("familyType")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Family Type</em> : selected.join(", ")
                }
              >
                <MenuItem value="" disabled>Family Type</MenuItem>
                {options.familyType.map((option) => ( // FIXED: Use options.familyType
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.familyType.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                multiple
                displayEmpty
                value={preferences.familyValues}
                onChange={handleDropdownChange("familyValues")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Family Values</em> : selected.join(", ")
                }
              >
                <MenuItem value="" disabled>Family Values</MenuItem>
                {options.familyValues.map((option) => ( // FIXED: Use options.familyValues
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.familyValues.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  

  {/* Education Preference */}
  <Typography variant="h6">Education Preference</Typography>
  <Divider sx={{ borderBottomWidth: 2 }} />
   <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Education</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.education}
      onChange={handleDropdownChange("education")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Education</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Education</MenuItem>
      {options.education.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.education.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Employment Type */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    <Select
      multiple
      displayEmpty
      value={preferences.employed || []}
      onChange={handleDropdownChange("employed")}
      renderValue={(selected) =>
        selected.length === 0 ? <em>Employed In</em> : selected.join(", ")
      }
    >
      <MenuItem value="" disabled>Employed In</MenuItem>
      {options.employed.map((option) => ( // FIXED: Use options.employed
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.employed.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Profession Selection */}
  <TextField
              sx={{mb: 1}}
                fullWidth
                label="occupation"
                name="occupation"
                value={preferences.occupation}
                onChange={handleTextFieldChange("occupation")}
                margin="normal"
              />


  {/* Annual Income */}
  <FormControl fullWidth sx={{ mb: 2 }}>
    <Select
      displayEmpty
      value={preferences.annualIncome || []}
      onChange={handleDropdownChange("annualIncome")}
      renderValue={(selected) =>
        selected.length === 0 ? <em>Annual Income</em> : selected
      }
    >
      <MenuItem value="" disabled>Annual Income</MenuItem>
      {options.annualIncome.map((option) => ( // FIXED: Use options.annualIncome
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.annualIncome.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Location Preference */}
  <Typography variant="h6">Location Preference</Typography>
  <Divider sx={{ borderBottomWidth: 2 }} />
   <FormControl fullWidth sx={{ mb: 2 }}>
    {/* <InputLabel>Location</InputLabel> */}
    <Select
      multiple
      displayEmpty
      value={preferences.location}
      onChange={handleDropdownChange("location")}
      renderValue={(selected) => 
        selected.length === 0 ? <em>Location</em> : selected.join(", ")
    }
>
    <MenuItem value="" disabled>Location</MenuItem>
      {options.location.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={preferences.location.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <Button variant="contained" color="primary" type="submit">
    Submit Preferences
  </Button>
</Box>
      </Paper>
    </Box>

    );
  };

export default PreferencePre;
