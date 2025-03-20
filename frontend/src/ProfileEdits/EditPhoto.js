import React, { useState } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ProfilePhotoUpload = ({ user, setUser }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await axios.post(
        `http://localhost:5000/upload-profile-photo/${auth.user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUser((prevUser) => ({ ...prevUser, image: data.imageUrl }));
      setOpen(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <Box textAlign="center">
        <Box display={"grid"} justifyContent={"center"}>
      <Avatar src={preview} sx={{ width: 80, height: 80,mt:2,ml:5.8 }} />
      <Button variant="contained" startIcon={<PhotoCamera />} sx={{ mt: 2 }} onClick={() => setOpen(true)}>
        Add/Edit Photo
      </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={preview} sx={{ width: 120, height: 120, mb: 2 }} />
            <input type="file" accept="image/*" onChange={handleImageChange} hidden id="file-upload" />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <IconButton component="span" color="primary">
                <PhotoCamera fontSize="large" />
              </IconButton>
              <Typography variant="body2">Choose a photo</Typography>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpload} color="primary" disabled={!selectedImage}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePhotoUpload;
