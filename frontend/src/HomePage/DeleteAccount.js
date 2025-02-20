import React, { useState } from "react";
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DeleteAccount = () => {
  const navigate=useNavigate();
  const auth=useAuth();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userId= auth?.user?.id;
  console.log(userId);
  const handleDelete = async () => {
    try {
      
      const res=await axios.delete(`http://localhost:5000/delete-account?userId=${userId}`
    );
      console.log(res.data);
      // Clear user data and navigate to register page
      localStorage.removeItem("token");
      navigate("/register");

      console.log("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Delete Account
      </Typography>
      <Typography variant="body1" gutterBottom>
        Deleting your account is permanent and cannot be undone. All your data will be lost.
      </Typography>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete My Account
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteAccount;