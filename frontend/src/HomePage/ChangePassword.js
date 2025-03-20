import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import axios from 'axios';
import { useAuth } from "../routes/AuthContex";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const auth=useAuth();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
 const userId=auth?.user?.id;
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    const res=await axios.post("http://localhost:5000/change-password",
      { userId,currentPassword, newPassword }
      
    )
    alert(res.data.message);
    console.log("Password changed successfully");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Current Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={handleTogglePassword} />}
          label="Show Passwords"
        />
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
      </Box>
    </Container>
  );
};

export default ChangePassword;
