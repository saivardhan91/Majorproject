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
const matches = [
  { name: "M Bala Shivangini", age: "21 Yrs", height: "5'0", img: "https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg" },
  { name: "Vasanta", age: "20 Yrs", height: "5'1", img: "https://beyondages.com/wp-content/uploads/2020/06/AdobeStock_71430219.jpeg" },
  { name: "Gayathri Sadanap", age: "21 Yrs", height: "5'3", img: "https://th.bing.com/th/id/OIP.1mEPKraRlY_l_KgKK6qQKwHaD4?rs=1&pid=ImgDetMain" },
  { name: "Spandana Queen", age: "19 Yrs", height: "4'8", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/shutterstock_193527755.jpg?itok=uS1VIBoY" },
  { name: "Swetha M", age: "19 Yrs", height: "5'0", img: "https://th.bing.com/th/id/OIP.STZ0WGJNY4VXfFuqKNKbPgAAAA?rs=1&pid=ImgDetMain" },
  { name: "Priya Reddy", age: "22 Yrs", height: "5'2", img: "https://th.bing.com/th/id/OIP.1mEPKraRlY_l_KgKK6qQKwHaD4?rs=1&pid=ImgDetMain" },
  { name: "Ananya Rao", age: "24 Yrs", height: "5'5", img: "https://via.placeholder.com/150" }, // Placeholder image
];
const MatrimonyUI = () => {

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);
  const displayedMatches = matches.slice(0, 6);

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
        <Grid container spacing={2}>
              {displayedMatches.map((match, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <Card sx={{ textAlign: "center", padding: 1, height: 250, display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                     
                      image={match.img}
                      alt={match.name}
                      sx={{ objectFit:"cover",width: "100%", height:180 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {match.name}
                      </Typography>
                      <Typography variant="body2">{match.age}, {match.height}</Typography>
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