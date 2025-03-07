import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Avatar, Button, Grid, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../HomePage/Navbar";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ProfilePage = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth?.user?.id) return;
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth.user.id}`);
        setUser(response?.data?.data);
        setBio(response?.data?.data?.bio || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [auth?.user?.id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const res= await axios.put(`http://localhost:5000/update-bio/${auth.user.id}`, { bio });
      setUser({ ...user, bio });
      console.log(res.data);
      handleClose();
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <Box >
        <Grid item xs={12} md={8}>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="green">Personal Information</Typography>
                <Button startIcon={<EditIcon />} size="small" onClick={handleOpen}>Edit</Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>{user?.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>

      {/* Edit Bio Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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

export default ProfilePage;
