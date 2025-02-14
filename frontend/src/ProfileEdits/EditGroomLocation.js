import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Button, Grid, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const EditGroomLocation = ({ user, setUser }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(user?.professionalDetails?.country || "");
  const [state, setState] = useState(user?.professionalDetails?.state|| "");
  const [city, setCity] = useState(user?.professionalDetails?.city || "");
  const [citizenship, setCitizenship] = useState(user?.professionalDetails?.country  || "");

  useEffect(() => {
    setCountry(user?.professionalDetails?.country || "");
    setState(user?.professionalDetails?.state || "");
    setCity(user?.professionalDetails?.city || "");
    setCitizenship(user?.professionalDetails?.country || "");
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update-groom-location/${auth.user.id}`, { 
        country, state, city, citizenship 
      });

      setUser({ 
        ...user, 
        groomLocation: { country, state, city, citizenship } 
      });

      handleClose();
    } catch (error) {
      console.error("Error updating groom location:", error);
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Groom's Location</Typography>
          <Button startIcon={<EditIcon />} size="small" onClick={handleOpen}>Edit</Button>
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}><Typography variant="body2">Country:{user?.professionalDetails?.country || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">State:{user?.professionalDetails?.state || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">City:{user?.professionalDetails?.workLocation || "N/A"}</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">Citizenship: {user?.professionalDetails?.country  || "N/A"}</Typography></Grid>
        </Grid>
      </CardContent>

      {/* Edit Groom Location Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Groom Location</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Country" value={country} onChange={(e) => setCountry(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="State" value={state} onChange={(e) => setState(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Citizenship" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EditGroomLocation;
