import React from "react";
import { Box, Typography, Card, Avatar, Button, Grid, CircularProgress,CardContent } from "@mui/material";
import { PhotoCamera, Visibility } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";
const ProfilePage = () => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
    <Box sx={{ padding: 3, maxWidth: 1000, margin: "auto", bgcolor: "#f5f5f5",mt:2 }}>
      {/* Profile Section */}
      <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">Gulla Chinnu</Typography>
                  <Typography variant="body2">21 Yrs, 5 Ft 8 In / 173 Cms</Typography>
                  <Typography variant="body2">Hyderabad, Telangana, India</Typography>
                  <Typography variant="body2">B.Tech., Software Professional</Typography>
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 2 }}>Add/Edit Photos</Button>
            </CardContent>
          </Card>

          {/* Photos Upload Section
          <Card sx={{ mt: 2, backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="body1">
                Photos are the first thing that prospects look at.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Upload Photos Now
              </Button>
            </CardContent>
          </Card> */}

          {/* Personal Information Section */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="green">Personal Information</Typography>
                <Button startIcon={<EditIcon />} size="small">Edit</Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                I completed my bachelor's degree and am now working as a software professional.
              </Typography>
            </CardContent>
          </Card>

          {/* Basic Details Section */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Basic Details</Typography>
                <Button startIcon={<EditIcon />} size="small">Edit</Button>
              </Box>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}><Typography variant="body2">Profile created for: My Self</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Name: Gulla Chinnu</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Age: 21 Years</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Height: 5 Ft 8 In / 173 Cms</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Marital Status: Never Married</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Mother Tongue: Telugu</Typography></Grid>
              </Grid>
            </CardContent>
          </Card>
           {/* Religion Information */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Religion Information</Typography>
              <Button startIcon={<EditIcon />} size="small">Edit</Button>
            </Box>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}><Typography variant="body2">Religion: Hindu</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Caste/Sub Caste:---</Typography></Grid>
                
              </Grid>
          </CardContent>
        </Card>
        
        {/* Groom's Location */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Groom's Location</Typography>
              <Button startIcon={<EditIcon />} size="small">Edit</Button>
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}><Typography variant="body2">Country: India</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">State: Telangana</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">City: Hyderabad</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Citizenship: India</Typography></Grid>
              </Grid>
          </CardContent>
        </Card>
        
        {/* Professional Information */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Professional Information</Typography>
              <Button startIcon={<EditIcon />} size="small">Edit</Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}><Typography variant="body2">Education: B.Tech.</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Employed in: Private Sector</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Occupation: Software Professional</Typography></Grid>
                
              </Grid>
          </CardContent>
        </Card>
        </Grid>
      
    </Box>
    </Box>
  );
};

export default ProfilePage;