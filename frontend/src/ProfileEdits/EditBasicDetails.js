import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Button, Grid, Modal, TextField, CardContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ProfilePage = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth?.user?.id) return;
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth.user.id}`);
        setUser(response?.data?.data);
        setEditedDetails(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [auth?.user?.id]);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update-user/${auth.user.id}`, {
        familyDetails: {
          ...user.familyDetails,
          height: {
            feet: editedDetails.familyDetails?.height?.feet,
            inches: editedDetails.familyDetails?.height?.inches,
          },
          maritalStatus: editedDetails.familyDetails?.maritalStatus,
        },
        motherTongue: editedDetails.motherTongue,
      });
      setUser(editedDetails);
      handleClose();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Box>
      
        {/* Basic Details Section */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Basic Details</Typography>
              <Button startIcon={<EditIcon />} size="small" onClick={handleEditClick}>
                Edit
              </Button>
            </Box>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}><Typography variant="body2">Name: {user?.name}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">Age: 21 Years</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">Height: {user?.familyDetails?.height?.feet} Ft / {user?.familyDetails?.height?.inches} In</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">Marital Status: {user?.familyDetails?.maritalStatus}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">Mother Tongue: {user?.motherTongue}</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* Edit Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", p: 3, width: 400, borderRadius: 2 }}>
            <Typography variant="h6">Edit Basic Details</Typography>
            <TextField fullWidth label="Height (Feet)" name="heightFeet" value={editedDetails.familyDetails?.height?.feet || ""} onChange={(e) => setEditedDetails({ ...editedDetails, familyDetails: { ...editedDetails.familyDetails, height: { ...editedDetails.familyDetails.height, feet: e.target.value } } })} sx={{ mt: 2 }}/>
            <TextField fullWidth label="Height (Inches)" name="heightInches" value={editedDetails.familyDetails?.height?.inches || ""} onChange={(e) => setEditedDetails({ ...editedDetails, familyDetails: { ...editedDetails.familyDetails, height: { ...editedDetails.familyDetails.height, inches: e.target.value } } })} sx={{ mt: 2 }}/>
            <TextField fullWidth label="Marital Status" name="maritalStatus" value={editedDetails.familyDetails?.maritalStatus || ""} onChange={handleChange} sx={{ mt: 2 }}/>
            <TextField fullWidth label="Age" name="Age" value={editedDetails.familyDetails?.Age || ""} onChange={handleChange} sx={{ mt: 2 }}/>
            <TextField fullWidth label="Mother Tongue" name="motherTongue" value={editedDetails.motherTongue || ""} onChange={handleChange} sx={{ mt: 2 }}/>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSave}>Save</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
   
  );
};

export default ProfilePage;