import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Card, Button, Grid, Modal, 
  Select, MenuItem, FormControl, CardContent 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ProfilePage = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const motherTongueOptions = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"];
  const heightFeetOptions = Array.from({ length: 3 }, (_, i) => i + 4); // [4, 5, 6]
  const heightInchesOptions = Array.from({ length: 12 }, (_, i) => i); // [0, 1, ..., 11]

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
    setEditedDetails(user); // Ensures modal opens with existing data
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update-baiscdetails/${auth.user.id}`, {
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
            <Grid item xs={6}>
              <Typography variant="body2">Name: {user?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Age: {user?.age} Years</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Height: {user?.familyDetails?.height?.feet} Ft / {user?.familyDetails?.height?.inches} In
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Marital Status: {user?.familyDetails?.maritalStatus}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Mother Tongue: {user?.motherTongue}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", p: 3, width: 400, borderRadius: 2 }}>
          <Typography variant="h6">Edit Basic Details</Typography>
          
          {/* Height Feet Dropdown */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              name="heightFeet"
              value={editedDetails.familyDetails?.height?.feet || ""}
              onChange={(e) => setEditedDetails({ 
                ...editedDetails, 
                familyDetails: { 
                  ...editedDetails.familyDetails, 
                  height: { ...editedDetails.familyDetails.height, feet: e.target.value } 
                } 
              })}
            >
              {heightFeetOptions.map((feet) => (
                <MenuItem key={feet} value={feet}>
                  {feet} Ft
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Height Inches Dropdown */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              name="heightInches"
              value={editedDetails.familyDetails?.height?.inches || ""}
              onChange={(e) => setEditedDetails({ 
                ...editedDetails, 
                familyDetails: { 
                  ...editedDetails.familyDetails, 
                  height: { ...editedDetails.familyDetails.height, inches: e.target.value } 
                } 
              })}
            >
              {heightInchesOptions.map((inches) => (
                <MenuItem key={inches} value={inches}>
                  {inches} In
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Marital Status Dropdown */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              name="maritalStatus"
              value={editedDetails.familyDetails?.maritalStatus || ""}
              onChange={(e) => setEditedDetails({ 
                ...editedDetails, 
                familyDetails: { 
                  ...editedDetails.familyDetails, 
                  maritalStatus: e.target.value 
                } 
              })}
            >
              {maritalStatusOptions.map((status) => (
                <MenuItem key={status} value={status} disabled={status === "Married"}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Mother Tongue Dropdown */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              name="motherTongue"
              value={editedDetails.motherTongue || ""}
              onChange={(e) => setEditedDetails({ ...editedDetails, motherTongue: e.target.value })}
            >
              {motherTongueOptions.map((tongue) => (
                <MenuItem key={tongue} value={tongue}>
                  {tongue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
