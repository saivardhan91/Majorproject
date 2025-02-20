import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "../routes/AuthContex"; // Import useAuth
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { signup } = useAuth(); // Get signup function from context
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setError(""); // Clear error on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateName = (name) => {
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(name); // Ensures only one space between first and last name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(formData.name)) {
      setError("Full Name must contain exactly one space between first and last name.");
      return;
    }
    try {
      await signup(formData); // Use signup function from useAuth
      toast.success("Registration Successful! 🎉");
      setFormData({ name: "", email: "", password: "" });
      navigate('/register/ReligionDetails');
    } catch (err) {
      setError(err.toString());
      toast.error("Registration Failed! ❌");
    }
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Box sx={{ paddingLeft: "200px" }}>
        <Grid item md={5}>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3 }}
          >
            <Typography variant="h5" sx={{ mb: 2 }} color="textPrimary" align="center">
              Register Account
            </Typography>

            <TextField 
              label="Full Name" 
              name="name" 
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2 }} 
              onChange={handleChange} 
              value={formData.name} 
              required
            />
            <TextField 
              label="Email" 
              name="email" 
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2 }} 
              onChange={handleChange} 
              value={formData.email} 
              required
            />
             <TextField 
            label="Password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            variant="outlined" 
            fullWidth 
            sx={{ mb: 2 }} 
            onChange={handleChange} 
            value={formData.password} 
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ?<Visibility />:<VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            
            {/* Error message area */}
            <Typography 
              color="error" 
              sx={{ 
                mb: 2, 
                width: "100%", 
                display: "block", 
                textAlign: "center", 
                minHeight: "24px", // Keeps layout stable
                visibility: error ? "visible" : "hidden" // Prevents shifting
              }}
            >
              {error}
            </Typography>
  
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register Free
            </Button>
          </Box>
        </Grid>
      </Box>
      <Grid item xs={12} md={8}></Grid>
    </Grid>
  );
};

export default Register;
