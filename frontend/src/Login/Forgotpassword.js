import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
} from '@mui/material';
import bg from '../images/bg5.jpg';
import Forgot from './Forgot.js';

const ForgotPassword = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <Box>
      {/* Header Section */}
      <AppBar position="fixed" sx={{ bgcolor: 'rgb(243, 182, 162)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            EternalBond
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ pr: 2, color: 'black' }}>Already a member?</Typography>
            <Button
              color="primary"
              sx={{ textTransform: 'capitalize', fontSize: '17px' }}
              onClick={handleOpenLoginModal}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          mt: '64px', // Adjust for AppBar height
          minHeight: '100vh', // Better for responsiveness
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          color: 'white',
        }}
      >
        <Forgot />
      </Box>

      {/* Login Modal */}
      <Modal open={openLoginModal} onClose={handleCloseLoginModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 300,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>

      {/* Footer Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 2, mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2025 EternalBond.com. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
