import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Import Axios
import { toast } from "react-toastify"; // ✅ Import Toast for notifications
import { useAuth } from "../routes/AuthContex";
const ProfileForm = () => {
  const auth=useAuth();
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(localStorage.getItem("profileImage") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBio = localStorage.getItem("userBio");
    if (savedBio) setBio(savedBio);
  }, []);

  const handleBioChange = (event) => {
    if (event.target.value.length <= 200) {
      setBio(event.target.value);
      localStorage.setItem("userBio", event.target.value);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    localStorage.removeItem("profileImage");
  };

  const handleSkip = () => {
    console.log("User skipped profile setup.");
    navigate("/Home");
  };

  // ✅ Function to send data to the backend
  
  const handleSaveProfile = async () => {
    const userId = auth.user.id;
    try {
      const response = await axios.post("http://localhost:5000/ProfileImage", {
        userId,
        bio,
        image, // Sending Base64 image
      });
  
      if (response.status === 201) {
        toast.success("Profile saved successfully! 🎉");
  
        // Clear form fields for the next register
        setImage(null);
        setBio("");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("userBio");
  
        navigate("/mbtiTest");
      }
    } catch (error) {
      toast.error("Error saving profile! ❌");
      console.error("Error:", error);
    }
  };
  

  return (
    <Box
      sx={{
        backgroundColor: "rgb(243, 182, 162)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Skip Button at the Top-Right Corner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          Edit Your Profile
        </Typography>
        <Button
          onClick={handleSkip}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#ff6f00",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Skip
        </Button>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Avatar src={image} sx={{ width: 120, height: 120, border: "2px solid #ff6f00" }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" component="label" sx={{ backgroundColor: "#ff6f00", "&:hover": { backgroundColor: "#e65100" } }}>
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            {image && (
              <IconButton color="error" onClick={handleRemoveImage}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <TextField
          label="Write about yourself"
          multiline
          rows={4}
          value={bio}
          onChange={handleBioChange}
          variant="outlined"
          fullWidth
          helperText={`${bio.length}/200 characters`}
        />

        <Button
          onClick={handleSaveProfile} // ✅ Call API on Save
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
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
