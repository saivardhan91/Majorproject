import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
} from '@mui/material';
import bg from '../src/images/bg_lp.webp';
import Register from './Login/Register';
import Login from './Login/Login';
const MatrimonyUI = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <Box>
      {/* Header Section */}
      <AppBar position="fixed" sx={{ backgroundColor: 'rgb(243, 182, 162)' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} sx={{ color: 'black' }}>
            EternalBond
          </Typography>
          <Typography sx={{ paddingRight: '10px', color: 'black' }}>Already a member?</Typography>
          <Button
              color="inherit"
              sx={{ color: 'primary', textTransform: 'capitalize',fontSize:'17px' }}
              onClick={handleOpenLoginModal}

            >
              login
            </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          marginTop: '64px', // Adjust for AppBar height
          height: '100vh', // Full viewport height
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          color: 'white',
          // padding: '0 16px', // Padding for responsiveness
          
        }}
      >
        < Register />
      </Box>
    
      {/* Login Modal */}
      <Modal open={openLoginModal} onClose={handleCloseLoginModal}>
        <Login />
      </Modal>

      {/* Search Section */}
  <Container maxWidth="lg" sx={{ marginTop: 4 }}>
  <Box
    component="form"
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 3,
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    {/* Looking For */}
    <Box flexDirection={'column'} >
    <Typography sx={{marginBottom:"10px"}}>I'm looking for</Typography>
    <TextField
      select
      // label="I am looking for"
      variant="outlined"
      sx={{ minWidth: 150 }}
      SelectProps={{ native: true }}
    >
      <option value="">Select</option>
      <option value="women">Women</option>
      <option value="men">Men</option>
    </TextField>
    </Box>
    {/* Aged Range */}
    <Box flexDirection={'column'} >
      <Typography marginBottom={"10px"}>aged</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        label="Min Age"
        type="number"
        variant="outlined"
        sx={{ width: 150 }}
        InputProps={{ inputProps: { min: 21 } }}
      />
      <Typography variant="body1">to</Typography>
      <TextField
        label="Max Age"
        type="number"
        variant="outlined"
        sx={{ width: 150 }}
        InputProps={{ inputProps: { min: 21 } }}
      />
    </Box>
    </Box>
    {/* Religion Dropdown */}
    <Box flexDirection={"column"} >
      <Typography sx={{marginBottom:"10px"}}>of religion</Typography>
    <TextField
      select
      // label="Religion"
      variant="outlined"
      sx={{ minWidth: 200 }}
      SelectProps={{ native: true }}
    >
      <option value="">Select Religion</option>
      <option value="hindu">Hindu</option>
      <option value="muslim">Muslim</option>
      <option value="christian">Christian</option>
      <option value="sikh">Sikh</option>
      <option value="jain">Jain</option>
      <option value="buddhist">Buddhist</option>
      <option value="other">Other</option>
    </TextField>
    </Box>
    {/* Mother Tongue Dropdown */}
    <Box flexDirection={'column'} >
      <Typography sx={{marginBottom:"10px"}}>and mother tongue</Typography>
    <TextField
      select
      // label="Mother Tongue"
      variant="outlined"
      sx={{ minWidth: 150 }}
      SelectProps={{ native: true }}
    >
      <option value="">Select Mother Tongue</option>
      <option value="telugu">Telugu</option>
      <option value="hindi">Hindi</option>
      <option value="english">English</option>
      <option value="tamil">Tamil</option>
      <option value="kannada">Kannada</option>
      <option value="malayalam">Malayalam</option>
      <option value="bengali">Bengali</option>
      <option value="gujarati">Gujarati</option>
      <option value="punjabi">Punjabi</option>
    </TextField>

    {/* Search Button */}
    <Button variant="contained" color="primary" sx={{ height: 56,width:"125px",marginLeft:"25px" }}>
      Search
    </Button>
    </Box>
  </Box>
</Container>



      {/* Profiles Section */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Profiles
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/200"
                  alt="Profile Picture"
                />
                <CardContent>
                  <Typography variant="h6">Name: User {index + 1}</Typography>
                  <Typography>Age: 25</Typography>
                  <Typography>Location: City {index + 1}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, marginTop: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2025 EternalBond.com. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MatrimonyUI;