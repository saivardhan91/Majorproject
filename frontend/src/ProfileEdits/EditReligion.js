import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Button, Grid, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ReligionInfo = ({ user, setUser }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [religion, setReligion] = useState(user?.religion || "");
  const [caste, setCaste] = useState(user?.caste || "");
  const [subCaste, setSubCaste] = useState(user?.subCaste || "");

  useEffect(() => {
    setReligion(user?.religion || "");
    setCaste(user?.caste || "");
    setSubCaste(user?.subCaste || "");
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update-religion/${auth.user.id}`, { religion, caste, subCaste });
      setUser({ ...user, religion, caste, subCaste });
      handleClose();
    } catch (error) {
      console.error("Error updating religion information:", error);
    }
  };

  return (
    <Box>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" >Religion Information</Typography>
            <Button startIcon={<EditIcon />} size="small" onClick={handleOpen}>Edit</Button>
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="body2">Religion: {user?.religion || "N/A"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Caste/Sub Caste: {user?.caste || "N/A"} / {user?.subCaste || "N/A"}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Religion Info Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Religion Information</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Caste"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Sub Caste"
            value={subCaste}
            onChange={(e) => setSubCaste(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReligionInfo;
