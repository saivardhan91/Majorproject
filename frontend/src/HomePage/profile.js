import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "./Navbar";
const ProfileCard = () => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
        <Navbar />
    <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
      {/* Profile Card */}
      <Card sx={{ display: "flex", p: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 150, borderRadius: 2 }}
          image="https://beyondages.com/wp-content/uploads/2020/06/AdobeStock_71430219.jpeg"
          alt="Profile"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">Later</Typography>
          <Typography variant="body2" color="textSecondary">
            21 Yrs, 5'4"
          </Typography>
          <Typography variant="body2" color="textSecondary">
           caste
          </Typography>
          <Typography variant="body2" color="textSecondary">
            B.Tech, Software Professional
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Eluru, Andhra Pradesh
          </Typography>

          {/* Icons */}
          <Box sx={{ mt: 2 }}>
            <IconButton color="primary">
              <CallIcon />
            </IconButton>
            <IconButton color="success">
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Interest Section */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button variant="outlined" color="secondary">
          Don't Show
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          endIcon={<SendIcon />}
        >
          Send Interest
        </Button>
      </Box>

      {/* Basic Details */}
      <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h6">Her Basic Details</Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <PersonIcon fontSize="small" /> Age: 21 Years
            </Typography>
            <Typography>
              <PersonIcon fontSize="small" /> Physique: 5'4" | Normal
            </Typography>
            <Typography>
              <PersonIcon fontSize="small" /> Language: Telugu (Mother Tongue)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <PersonIcon fontSize="small" /> Marital Status: Never Married
            </Typography>
            <Typography>
              <PersonIcon fontSize="small" /> Lives in: Eluru, Andhra Pradesh
            </Typography>
            <Typography>
              <PersonIcon fontSize="small" /> Citizenship: Indian
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Shortlist and Favorites */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
          Shortlist
        </Button>
        <Button variant="contained" color="primary">
          View Similar Profiles
        </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default ProfileCard;
