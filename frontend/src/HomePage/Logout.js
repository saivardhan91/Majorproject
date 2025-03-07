import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
const Logout = () => {
  const navigate = useNavigate();
    const { logout } = useAuth();  
  const handleLogout = () => {
    // Clear user session (localStorage, sessionStorage, etc.)
    logout();
    // localStorage.removeItem("userToken");  
    navigate("/register"); 
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f8f9fa" }}>
      <Card sx={{ p: 3, width: 350, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <ExitToAppIcon sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            Are you sure?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 3 }}>
            You will be logged out of your account.
          </Typography>

          <Button variant="contained" color="error" fullWidth onClick={handleLogout} sx={{ mb: 2 }}>
            Logout
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={handleCancel}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Logout;
