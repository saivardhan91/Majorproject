import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Card, Avatar, Button, Grid, CardContent, Dialog 
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";
import EditPersonal from '../ProfileEdits/EditPersonal';
import EditBasicDetails from '../ProfileEdits/EditBasicDetails';
import EditReligion from '../ProfileEdits/EditReligion';
import EditGroomLocation from "../ProfileEdits/EditGroomLocation";
import EditprofessionalInfo from '../ProfileEdits/EditProfessionalInfo';
import EditPhoto from '../ProfileEdits/EditPhoto';

const ProfilePage = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [openPhotoModal, setOpenPhotoModal] = useState(false); // State to control EditPhoto modal

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth?.user?.id) return; 

      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth.user.id}`);
        setUser(response?.data?.data);
        console.log("Fetched User:", response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth?.user?.id]);

  // Function to open the EditPhoto modal
  const handleOpenPhoto = () => {
    setOpenPhotoModal(true);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ padding: 3, maxWidth: 1000, margin: "auto", bgcolor: "#f5f5f5", mt: 2 }}>
        {/* Profile Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ width: 80, height: 80 }} src={user?.image} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{user?.name}</Typography>
                  <Typography variant="body2">
                    {user?.familyDetails?.height?.feet} Ft / {user?.familyDetails?.height?.inches} In
                  </Typography>
                  <Typography variant="body2">
                    {user?.professionalDetails?.workLocation}, {user?.professionalDetails?.state}, {user?.professionalDetails?.country}
                  </Typography>
                  <Typography variant="body2">
                    {user?.professionalDetails?.highestEducation}, {user?.professionalDetails?.occupation}
                  </Typography>
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpenPhoto}>
                Add/Edit Photos
              </Button>
            </CardContent>
          </Card>

        
          <Dialog open={openPhotoModal} onClose={() => setOpenPhotoModal(false)}>
            <EditPhoto onClose={() => setOpenPhotoModal(false)} />
          </Dialog>

          {/* Profile Edit Sections */}
          <EditPersonal />
          <EditBasicDetails />
          <EditReligion user={user} setUser={setUser} />
          <EditGroomLocation user={user} setUser={setUser} />
          <EditprofessionalInfo user={user} setUser={setUser} />
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
