import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Button, Grid, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const EditProfessionalInfo = ({ user, setUser }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [highestEducation, setHighestEducation] = useState(user?.professionalDetails?.highestEducation || "");
  const [employed, setEmployed] = useState(user?.professionalDetails?.employed || "");
  const [occupation, setOccupation] = useState(user?.professionalDetails?.occupation || "");
  const [workLocation, setWorkLocation] = useState(user?.professionalDetails?.workLocation || "");
  const [state, setState] = useState(user?.professionalDetails?.state || "");
  const [country, setCountry] = useState(user?.professionalDetails?.country || "");

  useEffect(() => {
    setHighestEducation(user?.professionalDetails?.highestEducation || "");
    setEmployed(user?.professionalDetails?.employed || "");
    setOccupation(user?.professionalDetails?.occupation || "");
    setWorkLocation(user?.professionalDetails?.workLocation || "");
    setState(user?.professionalDetails?.state || "");
    setCountry(user?.professionalDetails?.country || "");
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update-professional-info/${auth.user.id}`, { 
        highestEducation, employed, occupation, workLocation, state, country 
      });

      setUser({ 
        ...user, 
        professionalDetails: { highestEducation, employed, occupation, workLocation, state, country } 
      });

      handleClose();
    } catch (error) {
      console.error("Error updating professional information:", error);
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Professional Information</Typography>
          <Button startIcon={<EditIcon />} size="small" onClick={handleOpen}>Edit</Button>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}><Typography variant="body2">Education: {user?.professionalDetails?.highestEducation || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">Employed in: {user?.professionalDetails?.employed || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">Occupation: {user?.professionalDetails?.occupation || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">Work Location: {user?.professionalDetails?.workLocation || "N/A"}, {user?.professionalDetails?.state || "N/A"}, {user?.professionalDetails?.country || "N/A"}</Typography></Grid>
        </Grid>
      </CardContent>

      {/* Edit Professional Information Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Professional Information</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Highest Education" value={highestEducation} onChange={(e) => setHighestEducation(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Employed in" value={employed} onChange={(e) => setEmployed(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Work Location" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="State" value={state} onChange={(e) => setState(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Country" value={country} onChange={(e) => setCountry(e.target.value)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EditProfessionalInfo;
